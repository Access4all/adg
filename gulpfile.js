const gulp = require('gulp')
const sass = require('gulp-sass')
const handlebars = require('gulp-hb')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const through = require('through2')
const fs = require('fs')
const path = require('path')
const browserSync = require('browser-sync').create()
const requireNew = require('require-new')

gulp.task('css', () => {
  return gulp.src('./static/**/*.scss', {
    base: './static'
  })
    .pipe(sass())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
})

gulp.task('html', (cb) => {
  const markdown = requireNew('./helpers/markdown')
  
  const config = {
    src: './pages/**/*.md',
    base: './pages'
  }
  let pages = {}
  let layouts = {}
  let navigation = []

  const getUrl = (filePath) => {
    return path.relative(config.base, filePath)
      .replace(path.basename(filePath), '')
      .replace(/\/$/, '')
  }

  const getIdentifier = (filePath) => {
    return filePath.replace(path.extname(filePath), '')
  }

  const getLayout = (layoutName) => {
    layoutName = layoutName || 'layout'

    // Read layout file only once
    const layout = layouts[layoutName] = (layouts[layoutName] || fs.readFileSync('./layouts/' + layoutName + '.hbs'))

    return layout
  }

  gulp.src(config.src, {
    base: config.base
  })

    // Extract YAML front matter
    .pipe(frontMatter())

    // Compile Markdown to HTML
    .pipe(markdown())

    // Save result to `pages` to prevent having to read the file again in the second build step
    .pipe(through.obj((file, enc, cb) => {
      const url = getUrl(file.path)
      const parents = url.split('/').slice(0, -1).filter((item) => item !== '')
      const identifier = getIdentifier(file.path)

      pages[identifier] = {
        contents: file.contents,
        data: file.frontMatter
      }

      navigation.push({
        url,
        parents,
        title: file.frontMatter.title
      })

      return cb(null, file)
    }))

    // Second build step
    .on('finish', () => {

      // Create navigation hierarchy
      navigation = navigation.map((page) => {
        page.children = navigation.filter((child) => child.parents.includes(page.url))

        return page
      })

      // Skip reading file contents and use cached `pages` instead
      gulp.src(config.src, {
        base: config.base,
        read: false
      })

        // Prepare for Handlebars compiling by replacing file content with layout and saving content to `contents` property
        .pipe(through.obj((file, enc, cb) => {
          const identifier = getIdentifier(file.path)
          const page = pages[identifier]
          const layout = getLayout(page.data.layout)
          
          file.data = {
            title: page.data.title,
            contents: page.contents,
            navigation: navigation
          }

          file.contents = layout

          return cb(null, file)
        }))

        // Compile Handlebars to HTML
        .pipe(handlebars({
          partials: './partials/**/*.hbs',
          parsePartialName: (options, file) => {
            return path.relative('./', file.path).replace(path.extname(file.path), '')
          },
          helpers: {
            skipPage: (page, sublevel, options) => {
              // Skip sublevels in first navigation iteration
              return !sublevel && page.parents.length
            }
          }
        }))

        // Format
        .pipe(prettify({
          indent_with_tabs: false,
          max_preserve_newlines: 1
        }))

        // Rename to `index.html`
        .pipe(through.obj((file, enc, cb) => {
          file.path = file.path.replace(path.basename(file.path), 'index.html')

          return cb(null, file)
        }))

        .pipe(gulp.dest('./build'))
        .on('finish', () => {
          browserSync.reload()

          return cb()
        })
    })
})

gulp.task('build', ['css', 'html'], (cb) => {
  return cb()
})

gulp.task('default', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })

  gulp.watch(['./static/**/*.scss'], ['css'])
  gulp.watch(['./pages/**/*.md', './layouts/*.hbs', './partials/*.hbs', './helpers/*'], ['html'])
})
