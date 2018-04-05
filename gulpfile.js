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
          './gulp/helpers/*'
        ],
        gulp.series('html')
      )
      gulp.watch(['./pages/**/example.*'], gulp.series('html:examples'))
      gulp.watch(['./pages/{,**/}_media/**/*'], gulp.series('media'))
    }
  )
)
