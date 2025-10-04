
const { src, dest, watch, series } = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

const paths = {
  scssEntry: 'src/scss/main.scss',
  scssAll: 'src/scss/**/*.scss',
  cssDest: 'dist/css'
};

function scssDev() {
  return src(paths.scssEntry)
    .pipe(sourcemaps.init())
    .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.cssDest));
}

function scssBuild() {
  return src(paths.scssEntry)
    .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest(paths.cssDest));
}

function watcher() {
  watch(paths.scssAll, scssDev);
}


exports.default = series(scssDev, watcher); 
exports.build = series(scssBuild);          
