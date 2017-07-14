const gulp = require('gulp')
const sass = require('gulp-sass')
const markdown = require('gulp-markdown')
const handlebars = require('gulp-hb')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const through = require('through2')
const fs = require('fs')
const path = require('path')
const browserSync = require('browser-sync').create()

gulp.task('css', () => {
  return gulp.src('./static/**/*.scss', {
    base: './static'
  })
    .pipe(sass())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
})

gulp.task('html', (cb) => {
  const pages = {}
  const layouts = {}

  const getFileName = (file) => {
    return path.relative('./pages', file.path).replace(path.extname(file.path), '')
  }

  const getLayout = (config) => {
    const layoutName = config.layout || 'layout'

    // Read layout file only once
    const layout = layouts[layoutName] = layouts[layoutName] || fs.readFileSync('./layouts/' + layoutName + '.hbs')

    return layout
  }

  gulp.src('./pages/**/*.md', {
    base: './pages'
  })

    // Extract YAML front matter
    .pipe(frontMatter())

    // Compile Markdown to HTML
    .pipe(markdown())

    // Save result to `pages`
    // TODO: Create hierarchy
    .pipe(through.obj((file, enc, cb) => {
      const fileName = getFileName(file)
      
      pages[fileName] = {
        contents: file.contents,
        data: file.frontMatter,
        url: '/' + path.dirname(fileName),
        title: file.frontMatter.title
      }

      return cb(null, file)
    }))

    // Second build step
    .on('finish', () => {

      // Create basic page hierarchy
      for (let page in pages) {
        let parents = page.split('/')
          .filter((item) => item !== 'index')
          .slice(0, -1)
          .map((item) => item + '/index')
    
        if (!parents.length) continue

        parents.forEach((item) => {
          let clone = Object.assign({}, pages[page])
          pages[item].children = (pages[item].children || []).concat([clone])
        })

        pages[page].isChild = true
      }

      // Skip reading file contents and use cached `pages` instead
      gulp.src('./pages/**/*.md', {
        base: './pages',
        read: false
      })

        // Prepare for Handlebars compiling by replacing file content with layout and saving content to `contents` property
        .pipe(through.obj((file, enc, cb) => {
          const fileName = getFileName(file)
          const page = pages[fileName]
          const layout = getLayout(page.data)
          
          file.data = {
            title: page.data.title,
            contents: page.contents,
            pages: pages
          }

          file.contents = layout

          return cb(null, file)
        }))

        // Compile Handlebars to HTML
        .pipe(handlebars({
          partials: './partials/**/*.hbs',
          parsePartialName: (options, file) => {
            return path.relative('./', file.path).replace(path.extname(file.path), '')
          }
        }))

        // Format
        .pipe(prettify({
          indent_with_tabs: false,
          max_preserve_newlines: 1
        }))

        // Rename to `.html`
        .pipe(through.obj((file, enc, cb) => {
          file.path = file.path.replace(path.extname(file.path), '.html')

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
  gulp.watch(['./pages/**/*.md', './layouts/*.hbs', './partials/*.hbs'], ['html'])
})
