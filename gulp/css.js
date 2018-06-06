const gulp = require('gulp')
const sass = require('gulp-sass')
const nodeSassGlobbing = require('node-sass-globbing')

const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

module.exports = config => {
  return gulp
    .src(config.src, {
      base: config.srcBase
    })
    .pipe(
      sass({
        importer: nodeSassGlobbing,
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
