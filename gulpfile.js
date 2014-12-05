/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// Compile .scss files into css
gulp.task('styles', function () {
  return gulp.src('./styles/main.scss')
    .pipe($.sourcemaps.init())
      .pipe($.sass({errLogToConsole: true}))
      .pipe($.autoprefixer('last 1 version'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(gulp.dest('./styles'));
});


// Reload page after html pages
gulp.task('html', ['styles'], function () {
  gulp.src('./*.html')
    .pipe($.connect.reload());
});


// Set up webserver + livereload with connect
gulp.task('connect', ['styles'], function() {
  $.connect.server({
    root: './',
    livereload: true
  });
});


// Watch files for changes
gulp.task('watch', ['connect'], function() {
  gulp.watch(['./*.html', './styles/*.scss'], ['html']);
});


// Default task
gulp.task('default', ['html', 'watch'], function() {
  return console.log("All tasks are done! Now watching...");
});