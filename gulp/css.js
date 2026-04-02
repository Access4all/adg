import gulp from 'gulp'
import gulpSassInit from 'gulp-sass'
import sassCompiler from 'sass'
import globImporter from 'node-sass-glob-importer'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'

const sass = gulpSassInit(sassCompiler)

export default config => {
  return gulp
    .src(config.src, {
      base: config.srcBase
    })
    .pipe(
      sass({
        importer: globImporter(),
        includePaths: config.includePaths,
        silenceDeprecations: ['import', 'legacy-js-api'],
        quietDeps: true
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
