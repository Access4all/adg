const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const util = require('gulp-util')
const del = require('del')
const _ = require('lodash')

const html = require('./gulp/html')
const css = require('./gulp/css')
const js = require('./gulp/javascript')
const examples = require('./gulp/examples')

function errorHandler (err) {
  util.log(
    err.plugin || '',
    util.colors.cyan(err.fileName),
    util.colors.red(err.message)
  )
}

gulp.task('html', cb =>
  html(
    {
      src: './pages/**/*.md',
      base: './pages',
      host: 'https://accessibility-developer-guide.netlify.com',
      sitemap: './dist/sitemap.xml',
      feed: {
        json: './dist/feed/feed.json',
        atom: './dist/feed/atom.xml',
        rss: './dist/feed/rss.xml'
      },
      errorHandler
    },
    () => {
      browserSync.reload()

      cb()
    }
  )
)

gulp.task('html:examples', cb =>
  examples(
    {
      src: './pages/**/example.html',
      base: './pages',
      errorHandler
    },
    () => {
      browserSync.reload()

      cb()
    }
  )
)

gulp.task('css', cb => {
  css({
    src: './src/assets/**/*.scss',
    srcBase: './src/assets',
    includePaths: ['node_modules', './src/assets/css/', './src/components/'],
    dist: './dist',
    errorHandler
  })
    .pipe(browserSync.stream())
    .on('finish', () => cb())
})

gulp.task('js', cb => {
  const done = _.once(cb)

  js(
    {
      entry: {
        scripts: './src/assets/js/ui.js'
      },
      dist: './dist/js/',
      publicPath: '/js/'
    },
    () => {
      browserSync.reload()

      done()
    }
  )
})

gulp.task(
  'media:copy',
  gulp.parallel(
    function content () {
      return gulp
        .src(['./pages/{,**/}_media/**/*', './pages/**/example.png'], {
          base: './pages'
        })
        .pipe(gulp.dest('./dist'))
    },
    function assets () {
      return gulp
        .src(['./src/assets/img/**/*'], {
          base: './src/assets'
        })
        .pipe(gulp.dest('./dist'))
    }
  )
)

gulp.task('media:resize', () => {
  const resize = require('gulp-jimp-resize')
  const through = require('through2')
  const path = require('path')

  return gulp
    .src(['./pages/{,**/}_media/**/*', './pages/**/example.png'], {
      base: './pages'
    })
    .pipe(
      resize({
        // TODO: Configure sizes
        sizes: [
          {
            suffix: 'medium',
            width: 1000,
            upscale: false
          },
          {
            suffix: 'small',
            width: 500,
            upscale: false
          }
        ]
      })
    )
    .pipe(
      // `base` option seems to be ignored by plugin
      through.obj((file, enc, cb) => {
        file.path = path.relative('./pages', file.path)

        cb(null, file)
      })
    )
    .pipe(gulp.dest('./dist'))
})

gulp.task('media', gulp.parallel('media:copy', 'media:resize'))

gulp.task('clean', () => del('./dist'))

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('css', 'js', 'media', 'html', 'html:examples')
  )
)

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
          './gulp/helpers/*'
        ],
        gulp.series('html')
      )
      gulp.watch(['./pages/**/example.*'], gulp.series('html:examples'))
      gulp.watch(['./pages/{,**/}_media/**/*'], gulp.series('media'))
    }
  )
)
