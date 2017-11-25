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
const webpack = require('webpack')
const plumber = require('gulp-plumber')
const util = require('gulp-util')
const del = require('del')

function errorHandler(err) {
  util.log(err.plugin || '', util.colors.cyan(err.fileName), util.colors.red(err.message));
}

gulp.task('js', (cb) => {
  const compiler = webpack({
    entry: {
      scripts: './static/js/scripts.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        // Util: "exports-loader?Util!bootstrap/js/dist/util",
        // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      }),
      new webpack.optimize.UglifyJsPlugin()
    ],
    output: {
      path: path.resolve('./build/js/'),
      filename: '[name].js'
    },
    devtool: 'eval-cheap-module-source-map'
  })

  compiler.run((err, stats) => {
    if (err) {
      console.log(err)

      return cb()
    }

    console.log(stats.toString({
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
    }))

    return cb()
  })
})

gulp.task('css', () => {
  return gulp.src('./static/**/*.scss', {
    base: './static'
  })
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', errorHandler))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
})

gulp.task('html', (cb) => {
  const markdown = requireNew('./helpers/markdown')

  const config = {
    src: './pages/**/*.md',
    base: './pages'
  }

  const files = []
  const layouts = {}
  let navigation = []

  const getUrl = (filePath) => {
    return path.relative(config.base, filePath)
      .replace(path.basename(filePath), '')
      .replace(/\/$/, '')
  }

  const getLayout = (layoutName) => {
    layoutName = layoutName || 'layout'

    // Read layout file only once
    const layout = layouts[layoutName] = (layouts[layoutName] || fs.readFileSync('./layouts/' + layoutName + '.hbs'))

    return layout
  }

  return gulp.src(config.src, {
    base: config.base
  })
    .pipe(plumber())

    // Extract YAML front matter
    .pipe(frontMatter().on('error', errorHandler))

    // Compile Markdown to HTML
    .pipe(markdown().on('error', errorHandler))

    // Build up navigation
    .pipe(through.obj((file, enc, cb) => {
      const url = getUrl(file.path)
      const parents = url.split('/').slice(0, -1).filter((item) => item !== '')

      files.push(file);

      navigation.push({
        url,
        parents,
        title: file.frontMatter.title
      })

      return cb()
    }, function(cb) {
      // Create navigation hierarchy
      navigation = navigation.map((page) => {
        page.children = navigation.filter((child) => child.parents.includes(page.url)).sort((a, b) => a.position - b.position)

        return page
      }).sort((a, b) => a.position - b.position)

      // Return files back to stream
      files.forEach(this.push.bind(this))

      return cb()
    }))

    // Prepare for Handlebars compiling by replacing file content with layout and saving content to `contents` property
    .pipe(through.obj((file, enc, cb) => {
      try {
        const layout = getLayout(file.frontMatter.layout)
        
        file.data = {
          title: file.frontMatter.title,
          contents: file.contents,
          navigation: navigation
        }

        file.contents = layout

        return cb(null, file)
      } catch (err) {
        err.plugin = 'data'
        err.fileName = file.path

        return cb(err, file)
      }
    }).on('error', errorHandler))

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
    }).on('error', errorHandler))

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
    })
})

gulp.task('media', () => {
  return gulp.src('./pages/{,**/}_media/**/*', {
    base: './pages'
  })
    .pipe(gulp.dest('./build'))
})

gulp.task('clean', () => del('./build'))

gulp.task('build', gulp.series('clean', 'css', 'html', 'js', 'media'))

gulp.task('default', gulp.series('build', function serveAndWatch() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })

  gulp.watch(['./static/**/*.scss'], gulp.series('css'))
  gulp.watch(['./pages/**/*.md', './layouts/*.hbs', './partials/*.hbs', './helpers/*'], gulp.series('html'))
  gulp.watch(['./pages/{,**/}_media/**/*'], gulp.series('media'))
}))
