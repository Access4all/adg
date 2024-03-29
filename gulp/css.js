const gulp = require('gulp')
const sass = require('gulp-sass')(require('node-sass'))
const globImporter = require('node-sass-glob-importer')

const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

module.exports = config => {
  return gulp
    .src(config.src, {
      base: config.srcBase
    })
    .pipe(
      sass({
        importer: globImporter(),
        includePaths: config.includePaths
      }).on('error', config.errorHandler)
    )
    .pipe(
      postcss([
        autoprefixer({
          // browsers: see package.json > browserlist
          flexbox: 'no-2009',
          cascade: false
        })
      ])
    )
    .pipe(gulp.dest(config.dist))
}
