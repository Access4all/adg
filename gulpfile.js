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

function errorHandler(err) {
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

  gulp
    .src('./src/assets/js/lib/vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task(
  'media:copy',
  gulp.parallel(
    function demo() {
      return gulp
        .src(
          [
            // Static html files, e.g. `bad-iframe-with-interferring-headings/iframe.html`
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
    function content() {
      return gulp
        .src(['./pages/{,**/}_media/**/*', './pages/**/*.{png,jpg,mp3}'], {
          base: './pages'
        })
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'))
    },
    function assets() {
      return gulp
        .src(['./src/assets/img/**/*'], {
          base: './src/assets'
        })
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'))
    },
    function staticFiles() {
      return gulp
        .src(['./pages/**/_static/**/*'], {
          base: './pages'
        })
        .pipe(changed('./dist'))
        .pipe(gulp.dest('./dist'))
    }
  )
)

gulp.task('media:resize', () => {
  const sharp = require('sharp')
  const through = require('through2')
  const path = require('path')

  const resize = async ({ file, image, metadata, key, width }) => {
    const extension = path.extname(file.path)
    const fileName = path.basename(file.path, extension)
    const resizedPath = file.path.replace(
      `${fileName}${extension}`,
      `${fileName}-${key}${extension}`
    )

    let contents = file.contents

    if (metadata.width > width) {
      contents = await image.resize(width).toBuffer()
    }

    return {
      ...file,
      path: resizedPath,
      contents
    }
  }

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
      through.obj(async function (file, enc, cb) {
        // Work around duplicated files not taking `base` option into account
        file.path = path.relative('./pages', file.path)

        // Create resized images
        const image = await sharp(file.contents)
        const metadata = await image.metadata()

        this.push(
          await resize({ file, image, metadata, width: 680, key: 'large' })
        )
        this.push(
          await resize({ file, image, metadata, width: 546, key: 'medium' })
        )
        this.push(
          await resize({ file, image, metadata, width: 340, key: 'small' })
        )

        cb()
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

  const imgStream = data.img.pipe(gulp.dest('./src/assets/img/icons'))
  const cssStream = data.css.pipe(changed('./tmp')).pipe(gulp.dest('./tmp'))

  return merge(imgStream, cssStream)
})

gulp.task('media', gulp.parallel('media:copy', 'media:resize'))

gulp.task('clean', () => del('./dist'))

gulp.task(
  'build',
  gulp.series(
    'sprite',
    gulp.parallel('css', 'js', 'media', 'html', 'html:examples')
  )
)

gulp.task('rebuild', gulp.series('clean', 'build'))

gulp.task(
  'default',
  gulp.series('build', function serveAndWatch() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    })

    gulp.watch(
      ['./src/assets/css/**/*.scss', './src/components/**/*.scss'],
      gulp.series('css')
    )
    gulp.watch(['./src/assets/js/**/*.js'], gulp.series('js'))
    gulp.watch(
      [
        './pages/**/*.md',
        './src/templates/**/*.hbs',
        './src/components/**/*.hbs',
        './gulp/helpers/*',
        // Example content which is embedded in HTML pages
        './pages/**/_examples/**/*.html',
        './pages/**/_examples/**/*.js',
        './pages/**/_examples/**/*.css'
      ],
      gulp.series('html')
    )
    gulp.watch(['./pages/**/_examples/**/*'], gulp.series('html:examples'))
    gulp.watch(
      [
        // demo
        './pages/**/_examples/**/*.html',
        '!./pages/**/_examples/**/index.html',
        // content
        './pages/{,**/}_media/**/*',
        './pages/**/*.{png,jpg,mp3}',
        // assets
        './src/assets/img/**/*',
        // static
        './pages/{,**/}_static/**/*'
      ],
      gulp.series('media:copy')
    )
    gulp.watch(
      ['./pages/{,**/}_media/**/*', './pages/**/_examples/**/*.png'],
      gulp.series('media:resize')
    )
    gulp.watch(
      ['./src/assets/img/icons/**/*.png', '!./src/assets/img/icons/*.png'],
      gulp.series('sprite')
    )
  })
)
