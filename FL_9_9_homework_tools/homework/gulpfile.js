const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const order = require('gulp-order');
const connect = require('gulp-connect');
const runSequence = require('run-sequence');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

gulp.task('copy-libs', function() {
  gulp.src('node_modules/moment/min/moment.min.js')
  .pipe(gulp.dest('dist'));
});

gulp.task('uglify-js', function() {
  gulp.src('src/js/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(order([
    'canvasState.js',
    'clock.js',    
    'app.js'
    ]))
  .pipe(uglify())  
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('dist'))
});

gulp.task('uglify-js-dev', function() {
  gulp.src('src/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(order([
    'canvasState.js',
    'clock.js',    
    'app.js'
    ]))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
});

gulp.task('uglify-scss', function() {
  gulp.src('src/sass/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('dist'))
});

gulp.task('uglify-scss-dev', function() {
  gulp.src('src/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() {
  del.sync('dist/**/*.*');
});

gulp.task('copy-html', function() {
  gulp.src('src/app.html')
  .pipe(rename('index.html'))
  .pipe(gulp.dest('dist'))
});

gulp.task('build', function() {
  runSequence(['clean', 'copy-libs', 'uglify-js-dev', 'uglify-scss-dev', 'copy-html']);
});

gulp.task('build-prod', function() {
  runSequence(['clean', 'copy-libs', 'uglify-js', 'uglify-scss', 'copy-html']);
});

gulp.task('default', function() {
  connect.server({
    port: 8080,
    root: 'dist'
  });

  gulp.watch(['src/**/*.*'], ['build']);
});

gulp.task('jshint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
  ;
});
