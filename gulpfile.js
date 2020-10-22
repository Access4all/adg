const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const log = require('fancy-log')
const colors = require('ansi-colors')
const del = require('del')
const _ = require('lodash')

const html = require('./gulp/html')
const css = require('./gulp/css')
const js = require('./gulp/javascript')
const examples = require('./gulp/examples')
const concat = require('gulp-concat')
const changed = require('gulp-changed')

function errorHandler (err) {
  log(err.plugin || '', colors.cyan(err.fileName), colors.red(err.message))
}

gulp.task('html', cb =>
  html(
    {
      src: ['./pages/**/*.md', '!./pages/**/_examples/**/*.md'],
      base: './pages',
      host: 'https://www.accessibility-developer-guide.com',
      sitemap: './dist/sitemap.xml',
      feed: {
        json: './dist/feed/feed.json',
        atom: './dist/feed/atom.xml',
        rss: './dist/feed/rss.xml'
      },
      errorHandler,
      rootDir: __dirname
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
      src: './pages/**/_examples/**/index.html',
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
    src: ['./src/assets/**/*.scss'],
    srcBase: './src/assets',
    includePaths: [
      'node_modules',
      './src/assets/css/',
      './src/components/',
      './tmp/'
    ],
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
        scripts: './src/assets/js/ui.js',
        cms: './src/assets/js/netlifycms.js'
      },
      dist: './dist/js/',
      publicPath: '/js/'
    },
    () => {
      browserSync.reload()

      done()
    }
  )

  gulp
    .src('./src/assets/js/lib/vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task(
  'media:copy',
  gulp.parallel(
    function demo () {
      return gulp
        .src(
          [
            './pages/**/_examples/**/*.html',
            '!./pages/**/_examples/**/index.html'
          ],
          {
            base: './pages'
          }
        )
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'))
    },
    function content () {
      return gulp
        .src(['./pages/{,**/}_media/**/*', './pages/**/*.{png,jpg,mp3}'], {
          base: './pages'
        })
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'))
    },
    function assets () {
      return gulp
        .src(['./src/assets/img/**/*'], {
          base: './src/assets'
        })
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'))
    }
  )
)

gulp.task('media:resize', () => {
  const resize = require('gulp-jimp-resize')
  const through = require('through2')
  const path = require('path')

  return gulp
    .src(['./pages/{,**/}_media/**/*', './pages/**/_examples/**/*.png'], {
      base: './pages'
    })
    .pipe(
      changed('./dist', {
        transformPath: newPath =>
          path.join(
            path.dirname(newPath),
            path.basename(newPath, path.extname(newPath)) +
              '-large' +
              path.extname(newPath)
          )
      })
    )
    .pipe(
      resize({
        sizes: [
          {
            suffix: 'large',
            width: 680,
            upscale: false
          },
          {
            suffix: 'medium',
            width: 546,
            upscale: false
          },
          {
            suffix: 'small',
            width: 340,
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

gulp.task('sprite', () => {
  const spritesmith = require('gulp.spritesmith')
  const merge = require('merge-stream')

  const data = gulp
    .src(['./src/assets/img/icons/**/*.png', '!./src/assets/img/icons/*.png'])
    .pipe(
      spritesmith({
        retinaSrcFilter: './src/assets/img/icons/2x/*.png',
        imgName: '../../img/icons/sprite-1x.png',
        retinaImgName: '../../img/icons/sprite-2x.png',
        cssName: 'icon-sprite.scss',
        cssVarMap: function (sprite) {
          if (sprite.image.includes('-2x')) {
            sprite.name = `${sprite.name}-2x`
          }
        }
      })
    )

  const imgStream = data.img
    .pipe(changed('./src/assets/img/icons'))
    .pipe(gulp.dest('./src/assets/img/icons'))

  const cssStream = data.css.pipe(changed('./tmp')).pipe(gulp.dest('./tmp'))

  return merge(imgStream, cssStream)
})

gulp.task(
  'editor:copy',
  gulp.parallel(
    function editor () {
      return gulp
        .src(
          [
            './src/editor/*'
          ],
          {
            base: './src/editor'
          }
        )
        .pipe(changed('./dist/editor'))
        .pipe(gulp.dest('./dist/editor'))
    }
  )
)

gulp.task('media', gulp.parallel('media:copy', 'media:resize'))

gulp.task('clean', () => del('./dist'))

gulp.task(
  'build',
  gulp.series(
    'sprite',
    gulp.parallel('css', 'js', 'media', 'html', 'html:examples', 'editor:copy')
  )
)

gulp.task('rebuild', gulp.series('clean', 'build'))

gulp.task(
  'default',
  gulp.series('build', function serveAndWatch () {
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
  })
)
