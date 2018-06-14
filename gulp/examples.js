const gulp = require('gulp')
const plumber = require('gulp-plumber')
const through = require('through2')
const handlebars = require('gulp-hb')
const frontMatter = require('front-matter')
const requireNew = require('require-new')
const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const babelPreset = require('@babel/preset-env')

module.exports = (config, cb) => {
  const helpers = requireNew('./helpers/examples')

  const layout = fs.readFileSync('./src/templates/example.hbs')

  return (
    gulp
      .src(config.src, {
        base: config.base,
        read: false
      })
      .pipe(plumber())

      // Wrap layout, prepare data
      .pipe(
        through
          .obj((file, enc, cb) => {
            const dir = path.dirname(file.path)
            const articlePath = path.join(
              file.path.replace(/\/_examples\/(.*)/, ''),
              'README.md'
            )
            const article = fs.existsSync(articlePath)
              ? fs.readFileSync(articlePath, 'utf-8')
              : ''
            const articleMeta = frontMatter(article).attributes
            const articleUrl = path.relative(
              config.base,
              path.dirname(articlePath)
            )
            const code = helpers.getCode(dir)
            const data = Object.assign(
              {
                codePen: helpers.getCodePenForm(code),
                title: `${code.details.title}: Code example`,
                article: {
                  url: `/${articleUrl}`,
                  title: articleMeta.navigation_title
                }
              },
              {
                html: code.html,
                css: code.css,
                js: babel.transform(code.js, {
                  presets: [
                    [
                      babelPreset,
                      {
                        targets: {
                          browsers: ['last 2 versions', 'ie 11']
                        }
                      }
                    ]
                  ]
                }).code
              }
            )

            file.contents = layout
            file.data = data

            return cb(null, file)
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
          }
        }).on('error', config.errorHandler)
      )

      .pipe(gulp.dest('./dist'))
  )
}
