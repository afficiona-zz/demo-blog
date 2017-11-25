/* globals require, exports */

'use strict';

// gulp plugins
var gulp     = require('gulp'),
  gutil        = require('gulp-util'),
  htmlReplace  = require('gulp-html-replace'),
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  jshint       = require('gulp-jshint'),
  clean        = require('gulp-clean'),
  connect      = require('gulp-connect'),
  browserify   = require('gulp-browserify'),
  imagemin     = require('gulp-imagemin'),
  rename = require('gulp-rename');

// Connect Task
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// Html reload
gulp.task('html', function () {
  return gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

// sass compiler task
gulp.task('sass', function () {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./app/styles/'))
    .pipe(connect.reload());
});

// sass prod compiler task
gulp.task('sass-prod', function () {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(connect.reload());
});

// Minify images
gulp.task('imagemin', function () {
  return gulp.src('./app/assets/images/**/*.{png,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'))
});

// Rewrite css url paths
gulp.task('rewrite-css', function () {
  return gulp.src('dist/styles/index.css').
    pipe(cssUrlAdjuster({
      replace:  ['./../assets/','./../img/']
    }))
    .pipe(gulp.dest('dist/styles/'));
});

// Script task
gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename(function (path) {
      path.basename = 'bundle';
    }))
    .pipe(gulp.dest('app/scripts'))
    .pipe(connect.reload());
});

// Script prod task
gulp.task('scripts-prod', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(rename(function (path) {
      path.basename = 'bundle';
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(connect.reload());
});

// html replace
gulp.task('html-replace', function () {
  return gulp.src('app/**/*.html')
    .pipe(htmlReplace({
      'css': 'dist/styles/index.css',
      'js': 'dist/scripts/bundle.js'
    }))
    .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
  gulp.watch([ 'app/styles/**/*.scss'], ['sass']);
  gulp.watch([ 'app/scripts' + '/**/*.js'], ['scripts']);
  gulp.watch(['./app/**/*.html'], ['html']);
});

gulp.task('serve', ['connect', 'sass', 'scripts', 'watch']);

gulp.task('clean', function () {
  gutil.log('Clean task goes here...');
});

gulp.task('copy', function () {
  gutil.log('Clean task goes here...');
});

gulp.task('usemin', function () {
  return gulp.src('./app/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean-build', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean-build', 'sass-prod', 'scripts-prod', 'imagemin', 'html-replace'], function () {
});

gulp.task('default', []);
