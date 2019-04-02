const gulp = require('gulp')
const handlebars = require('gulp-hb')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const through = require('through2')
const fs = require('fs')
const path = require('path')
const requireNew = require('require-new')
const plumber = require('gulp-plumber')
const normalize = require('normalize-strings')
const sm = require('sitemap')
const _ = require('lodash')
const { JSDOM } = require('jsdom')

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

const getParentUrl = url => url.substring(0, url.lastIndexOf('/'))

const getPageNavigation = options =>
  options.items.map((item, index) => extendNavigationItem(item, index, options))

// Add isCurrent / isActive properties, extend options.prevNext
const extendNavigationItem = (origItem, index, options) => {
  const item = _.merge({}, origItem)
  const level = options.level || 1

  item.level = level

  if (item.url === options.currentUrl) {
    const flattenedIndex = options.flattened.findIndex(
      flattenedItem => flattenedItem.url === item.url
    )
    const prev = options.flattened[flattenedIndex - 1]
    const next = options.flattened[flattenedIndex + 1]

    item.isCurrent = true
    item.isActive = true

    if (prev) {
      options.prevNext.prev = {
        title: prev.titleDetailed,
        url: prev.url
      }
    }

    if (next) {
      options.prevNext.next = {
        title: next.titleDetailed,
        url: next.url
      }
    }

    options.breadcrumb.push(item)

    item.children.forEach(child => {
      options.subPages.push({
        title: child.titleDetailed,
        lead: child.lead,
        url: child.url,
        level: level + 1
      })
    })
  } else if (options.currentUrl.includes(item.url)) {
    item.isActive = true

    options.breadcrumb.push(item)
  } else {
    const isInactive =
      // Not current item
      item.parent !== options.currentUrl &&
      // Not a parent of the current item
      item.parent !== getParentUrl(options.currentUrl) &&
      // Not a grand parent of the current item
      item.parent !== getParentUrl(getParentUrl(options.currentUrl)) &&
      // Not a first level item
      item.parent

    if (isInactive) {
      item.isInactive = true
    }
  }

  if (item.children) {
    item.children = item.children.map((child, childIndex) => {
      const childOptions = Object.assign({}, options, {
        items: item.children,
        level: level + 1
      })

      return extendNavigationItem(child, childIndex, childOptions)
    })
  }

  return item
}

// Create flat array of pages to be used for prev/next links
const flattenNavigation = items =>
  items.reduce((acc, item) => {
    acc = acc.concat(item)

    if (item.children) {
      acc = acc.concat(flattenNavigation(item.children))
    }

    return acc
  }, [])

module.exports = (config, cb) => {
  const markdown = requireNew('./helpers/markdown')(config.rootDir)
  const metatags = requireNew('./helpers/metatags')
  const Feed = requireNew('./helpers/rss')
  const appConfig = requireNew('../config')

  const files = []
  const sitemap = []
  const layouts = {}
  let navigation = []

  // const config = {
  //   src: './pages/**/*.md',
  //   base: './pages',
  //   host: 'https://www.accessibility-developer-guide.com',
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
          const env = {}
          const html = markdown(file.path).render(contents, env)

          file.contents = Buffer.from(html)

          file.data = Object.assign({}, file.data, env)

          return cb(null, file)
        })
        .on('error', config.errorHandler)
    )

    // Build up navigation
    .pipe(
      through.obj(
        (file, enc, cb) => {
          const url = getUrl(file.path, config.base)
          const parent = getParentUrl(url)
          const section = url.substring(0, url.indexOf('/')) || url || 'welcome'

          file.data = Object.assign({}, file.data, {
            url,
            isRoot: parent === url,
            section
          })

          files.push(file)

          navigation.push({
            url,
            parent: parent !== url ? parent : null,
            title: file.frontMatter.navigation_title,
            domid: 'nav-' + normalize(file.frontMatter.navigation_title),
            titleDetailed: file.data.title,
            lead: file.data.lead,
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
            const breadcrumb = []
            const subPages = []
            const pageNavigation = getPageNavigation({
              items: navigation,
              currentUrl,
              prevNext,
              breadcrumb,
              flattened: flattenNavigation(navigation),
              subPages
            })
            const metatagsData = {
              title: file.data.title,
              description: file.data.lead,
              card: 'summary',
              site_name: appConfig.title,
              url: `${appConfig.url}/${currentUrl}`
            }

            file.data = Object.assign({}, file.data, {
              changed: file.frontMatter.changed,
              title: file.data.title,
              contents: file.contents,
              navigation: pageNavigation,
              previousPage: prevNext.prev,
              nextPage: prevNext.next,
              subPages: file.data.isRoot
                ? navigation.map(item => ({
                  title: item.title,
                  url: item.url,
                  modifier: item.url,
                  level: 1
                }))
                : subPages,
              metatags: metatags.generateTags(metatagsData),
              breadcrumb: breadcrumb.sort((a, b) => {
                return a.url.length - b.url.length
              })
            })

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
        },
        helpers: {
          eq: function (v1, v2, options) {
            if (v1 === v2) {
              return options.fn(this)
            }

            return options.inverse(this)
          },
          or: function () {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean)
          }
        }
      }).on('error', config.errorHandler)
    )

    // Move cards in generated markup
    // We can't do this earlier since the cards are not yet know when we parse the markdown
    // .pipe(
    //   through.obj((file, enc, cb) => {
    //     const dom = new JSDOM(file.contents.toString())
    //     const cards = dom.window.document.querySelector('.cardmenu')

    //     if (cards) {
    //       const lead = dom.window.document.querySelector('.text_container p')

    //       if (lead) {
    //         lead.after(cards)

    //         file.contents = Buffer.from(dom.serialize())
    //       }
    //     }

    //     return cb(null, file)
    //   })
    // )

    // Format
    // .pipe(
    //   prettify({
    //     indent_with_tabs: false,
    //     max_preserve_newlines: 1
    //   })
    // )

    // Rename to `index.html`
    .pipe(
      through.obj((file, enc, cb) => {
        file.path = file.path.replace(path.basename(file.path), 'index.html')

        return cb(null, file)
      })
    )
    .pipe(gulp.dest('./dist'))
    .on('finish', () => {
      // Generate RSS feeds
      const feed = Feed(files)

      if (!fs.existsSync(path.dirname(config.feed.rss))) {
        fs.mkdirSync(path.dirname(config.feed.rss))
      }

      fs.writeFileSync(config.feed.json, feed.json1())
      fs.writeFileSync(config.feed.atom, feed.atom1())
      fs.writeFileSync(config.feed.rss, feed.rss2())

      // Generate sitemap
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
