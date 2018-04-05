const gulp = require('gulp')
const handlebars = require('gulp-hb')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const through = require('through2')
const fs = require('fs')
const path = require('path')
const requireNew = require('require-new')
const plumber = require('gulp-plumber')
const sm = require('sitemap')
const _ = require('lodash')

const getUrl = (filePath, base) => {
  return path
    .relative(base, filePath)
    .replace(path.basename(filePath), '')
    .replace(/\/$/, '')
}

const getLayout = (layoutName, layouts) => {
  layoutName = layoutName || 'layout'

  // Read layout file only once
  const layout = (layouts[layoutName] =
    layouts[layoutName] ||
    fs.readFileSync('./src/templates/' + layoutName + '.hbs'))

  return layout
}

const getPageNavigation = options =>
  options.items.map((item, index) => extendNavigationItem(item, index, options))

// Add isCurrent / isActive properties, extend options.prevNext
const extendNavigationItem = (origItem, index, options) => {
  const item = _.merge({}, origItem)

  if (item.url === options.currentUrl) {
    const prev = options.items[index - 1]
    const next = options.items[index + 1]

    item.isCurrent = true

    if (prev) {
      options.prevNext.prev = {
        title: prev.title,
        url: prev.url
      }
    }

    if (next) {
      options.prevNext.next = {
        title: next.title,
        url: next.url
      }
    }
  } else if (options.currentUrl.includes(item.url)) {
    item.isActive = true
  }

  if (item.children) {
    item.children = item.children.map((child, childIndex) => {
      const childOptions = Object.assign({}, options, {
        items: item.children
      })

      return extendNavigationItem(child, childIndex, childOptions)
    })
  }

  return item
}

module.exports = (config, cb) => {
  const markdown = requireNew('./helpers/markdown')

  const files = []
  const sitemap = []
  const layouts = {}
  let navigation = []

  // const config = {
  //   src: './pages/**/*.md',
  //   base: './pages',
  //   host: 'https://accessibility-developer-guide.netlify.com',
  //   sitemap: './dist/sitemap.xml'
  // }

  gulp
    .src(config.src, {
      base: config.base
    })
    .pipe(plumber())

    // Extract YAML front matter
    .pipe(frontMatter().on('error', config.errorHandler))

    // Compile Markdown to HTML
    .pipe(
      through
        .obj((file, enc, cb) => {
          const contents = file.contents.toString()
          const html = markdown.render(contents)

          file.contents = Buffer.from(html)

          return cb(null, file)
        })
        .on('error', config.errorHandler)
    )

    // Build up navigation
    .pipe(
      through.obj(
        (file, enc, cb) => {
          const url = getUrl(file.path, config.base)
          const parent = url.substring(0, url.lastIndexOf('/'))

          files.push(file)

          navigation.push({
            url,
            parent: parent !== url ? parent : null,
            title: file.frontMatter.navigation_title,
            position: file.frontMatter.position
          })

          return cb()
        },
        function (cb) {
          // Create navigation hierarchy
          navigation = navigation
            .map(page => {
              page.children = navigation
                .filter(child => child.parent === page.url)
                .sort((a, b) => a.position - b.position)

              return page
            })
            .filter(page => !page.parent && page.parent !== null)
            .sort((a, b) => a.position - b.position)

          // Return files back to stream
          files.forEach(this.push.bind(this))

          return cb()
        }
      )
    )

    // Prepare for Handlebars compiling by replacing file content with layout and saving content to `contents` property
    .pipe(
      through
        .obj((file, enc, cb) => {
          try {
            const layout = getLayout(file.frontMatter.layout, layouts)
            const relPath = path.relative('./pages', file.path)
            const currentUrl = relPath.substring(0, relPath.lastIndexOf('/'))
            const prevNext = {}
            const pageNavigation = getPageNavigation({
              items: navigation,
              currentUrl,
              prevNext
            })

            file.data = {
              title: file.frontMatter.title,
              contents: file.contents,
              navigation: pageNavigation,
              previousPage: prevNext.prev,
              nextPage: prevNext.next
            }

            sitemap.push({
              url: currentUrl
            })

            file.contents = layout

            return cb(null, file)
          } catch (err) {
            err.plugin = 'data'
            err.fileName = file.path

            return cb(err, file)
          }
        })
        .on('error', config.errorHandler)
    )

    // Compile Handlebars to HTML
    .pipe(
      handlebars({
        partials: './src/components/**/*.hbs',
        parsePartialName: (options, file) => {
          return path
            .relative('./src/components', file.path)
            .replace(path.extname(file.path), '')
        }
      }).on('error', config.errorHandler)
    )

    // Format
    .pipe(
      prettify({
        indent_with_tabs: false,
        max_preserve_newlines: 1
      })
    )

    // Rename to `index.html`
    .pipe(
      through.obj((file, enc, cb) => {
        file.path = file.path.replace(path.basename(file.path), 'index.html')

        return cb(null, file)
      })
    )
    .pipe(gulp.dest('./dist'))
    .on('finish', () => {
      const generatedSitemap = sm.createSitemap({
        hostname: config.host,
        urls: sitemap
      })

      generatedSitemap.toXML((err, xml) => {
        if (err) {
          console.log(err)
        }

        fs.writeFileSync(config.sitemap, xml)

        cb()
      })
    })
}
