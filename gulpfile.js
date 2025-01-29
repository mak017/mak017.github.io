const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const minimist = require('minimist');
merge = require('merge-stream');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const cache = require('gulp-cache');

const folders = ['portfolio', 'resume'];

gulp.task('clear', function (done) {
  cache.clearAll(done);
  console.log('Cache cleared');
});

gulp.task('sass', function () {
  const processors = [
    cssnext({
      browsers: ['last 2 version', '> 1%'],
    }),
    mqpacker({
      sort: sortCSSmq,
    }),
  ];

  const tasks = folders.map(function (element) {
    return gulp
      .src(element + '/scss/!(_)*.scss', {
        base: element + '/scss',
      })
      .pipe(
        plumber(function (error) {
          console.log('sass:', error.message);
          this.emit('end');
        }),
      )
      .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(cleanCSS())
      .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write())
      .pipe(plumber.stop())
      .pipe(gulp.dest(element + '/css'))
      .pipe(browserSync.stream());
  });
  return merge(tasks);
});

gulp.task('uglify', function () {
  return gulp
    .src('portfolio/js/main.js')
    .pipe(
      plumber(function (error) {
        console.log('uglify:', error.message);
        this.emit('end');
      }),
    )
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
    .pipe(gutil.env.production ? uglify() : gutil.noop())
    .on('error', swallowError)
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest('portfolio/js'))
    .on('end', function () {
      browserSync.reload();
    });
});

gulp.task('img', function () {
  return gulp
    .src(['portfolio', 'resume'] + '/images/**/*.{jpg,png,svg}')
    .pipe(
      debug({
        title: 'img:',
      }),
    )
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imageminJpegRecompress({
          loops: 4,
          min: 50,
          max: 95,
          quality: 'high',
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }),
        imagemin.svgo(),
      ]),
    )
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest('./'))
    .on('end', function () {
      browserSync.reload();
    });
});

gulp.task('watch', function () {
  gulp.watch('portfolio/js/main.js', gulp.series('uglify'));
  gulp.watch(['portfolio', 'resume'] + '/images/**/*.{jpg,png,svg}', gulp.series('img'));
  gulp.watch(['portfolio/scss/*.scss', 'resume/scss/*.scss'], gulp.series('sass'));

  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  browserSync.watch(['./*.html', 'resume/**/*.html']).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(gulp.parallel('uglify'), 'watch'));

console.log('gutil:', gutil.env.production);

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}
