const gulp = require('gulp')
const sass = require('gulp-sass')
const nodeSassGlobbing = require('node-sass-globbing')
const handlebars = require('gulp-hb')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const through = require('through2')
const fs = require('fs')
const path = require('path')
const browserSync = require('browser-sync').create()
const requireNew = require('require-new')
const webpack = require('webpack')
const plumber = require('gulp-plumber')
const util = require('gulp-util')
const del = require('del')
const once = require('once')

function errorHandler (err) {
  util.log(
    err.plugin || '',
    util.colors.cyan(err.fileName),
    util.colors.red(err.message)
  )
}

gulp.task('js', cb => {
  const compiler = webpack({
    entry: {
      scripts: './src/assets/js/ui.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: ['last 2 versions']
                  }
                }
              ]
            ]
          }
        }
      ]
    },
    plugins: [],
    output: {
      path: path.resolve('./dist/js/'),
      filename: '[name].js',
      chunkFilename: 'async/[name].js',
      publicPath: '/js/'
    }
  })

  const log = (err, stats) => {
    if (err) {
      console.log(err)

      return cb()
    }

    const formattedStats = stats.toString({
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false,
      assetsSort: 'name'
    })

    console.log(formattedStats)
  }

  if (util.env.watch) {
    compiler.watch({}, (err, stats) => {
      cb = once(cb)

      log(err, stats)

      browserSync.reload()

      return cb()
    })
  } else {
    compiler.run((err, stats) => {
      log(err, stats)

      return cb()
    })
  }
})

gulp.task('css', () => {
  return gulp
    .src('./src/assets/**/*.scss', {
      base: './src/assets'
    })
    .pipe(
      sass({
        importer: nodeSassGlobbing,
        includePaths: ['node_modules', './src/assets/css/', './src/components/']
      }).on('error', errorHandler)
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

gulp.task('html', cb => {
  const markdown = requireNew('./helpers/markdown')

  const config = {
    src: './pages/**/*.md',
    base: './pages'
  }

  const files = []
  const layouts = {}
  let navigation = []

  const getUrl = filePath => {
    return path
      .relative(config.base, filePath)
      .replace(path.basename(filePath), '')
      .replace(/\/$/, '')
  }

  const getLayout = layoutName => {
    layoutName = layoutName || 'layout'

    // Read layout file only once
    const layout = (layouts[layoutName] =
      layouts[layoutName] ||
      fs.readFileSync('./src/templates/' + layoutName + '.hbs'))

    return layout
  }

  return (
    gulp
      .src(config.src, {
        base: config.base
      })
      .pipe(plumber())

      // Extract YAML front matter
      .pipe(frontMatter().on('error', errorHandler))

      // Compile Markdown to HTML
      .pipe(
        through
          .obj((file, enc, cb) => {
            const contents = file.contents.toString()
            const html = markdown.render(contents)

            file.contents = Buffer.from(html)

            return cb(null, file)
          })
          .on('error', errorHandler)
      )

      // Build up navigation
      .pipe(
        through.obj(
          (file, enc, cb) => {
            const url = getUrl(file.path)
            const parent = url.substring(0, url.lastIndexOf('/'))

            files.push(file)

            navigation.push({
              url,
              parent: parent !== url ? parent : null,
              title: file.frontMatter.title
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
              const layout = getLayout(file.frontMatter.layout)
              const relPath = path.relative('./pages', file.path)
              const currentUrl = relPath.substring(0, relPath.lastIndexOf('/'))

              file.data = {
                title: file.frontMatter.title,
                contents: file.contents,
                navigation,
                currentUrl
              }

              file.contents = layout

              return cb(null, file)
            } catch (err) {
              err.plugin = 'data'
              err.fileName = file.path

              return cb(err, file)
            }
          })
          .on('error', errorHandler)
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
            isCurrent: (currentUrl, itemUrl, options) => {
              if (currentUrl === itemUrl) {
                return options.fn(this)
              } else {
                return options.inverse(this)
              }
            },
            isActive: (currentUrl, itemUrl, options) => {
              if (currentUrl !== itemUrl && currentUrl.includes(itemUrl)) {
                return options.fn(this)
              } else {
                return options.inverse(this)
              }
            }
          }
        }).on('error', errorHandler)
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
        browserSync.reload()
      })
  )
})

gulp.task('media', () => {
  return gulp
    .src('./pages/{,**/}_media/**/*', {
      base: './pages'
    })
    .pipe(gulp.dest('./dist'))
})

gulp.task('clean', () => del('./dist'))

gulp.task('build', gulp.series('clean', 'css', 'html', 'js', 'media'))

gulp.task(
  'default',
  gulp.series(
    function setWatchEnv (cb) {
      util.env.watch = true

      return cb()
    },
    'build',
    function serveAndWatch () {
      browserSync.init({
        server: {
          baseDir: './dist'
        }
      })

      gulp.watch(
        ['./src/assets/css/**/*.scss', './src/components/**/*.scss'],
        gulp.series('css')
      )
      gulp.watch(
        [
          './pages/**/*.md',
          './src/templates/**/*.hbs',
          './src/components/**/*.hbs',
          './helpers/*'
        ],
        gulp.series('html')
      )
      gulp.watch(['./pages/{,**/}_media/**/*'], gulp.series('media'))
    }
  )
)
