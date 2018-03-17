const gulp = require('gulp')
const sass = require('gulp-sass')
const nodeSassGlobbing = require('node-sass-globbing')

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
    .pipe(gulp.dest(config.dist))
}
