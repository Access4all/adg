const gulp = require('gulp')
const sass = require('gulp-sass')
const tree = require('directory-tree')
const markdown = require('gulp-markdown')
const handlebars = require('gulp-hb')
const frontmatter = require('gulp-front-matter')
const through = require('through2')
const fs = require('fs')
const path = require('path')
const serve = require('serve')
const open = require('open')

gulp.task('css', () => {
  return gulp.src('./static/**/*.scss', {
    base: './static'
  })
    .pipe(sass())
    .pipe(gulp.dest('./build'))
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
    .pipe(frontmatter())

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

        // Rename to `.html`
        .pipe(through.obj((file, enc, cb) => {
          file.path = file.path.replace(path.extname(file.path), '.html')

          return cb(null, file)
        }))

        // Save and run callback
        .pipe(gulp.dest('./build'))
        .on('finish', () => {
          return cb()
        })
    })
})

gulp.task('build', ['css', 'html'], (cb) => {
  return cb()
})

gulp.task('default', ['build'], () => {
  const server = serve('./build')

  open('http://localhost:5000')

  gulp.watch(['./static/**/*.scss'], ['css'])
  gulp.watch(['./pages/**/*.md', './layouts/*.hbs'], ['html'])
})
