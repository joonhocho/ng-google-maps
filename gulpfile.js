'use strict';

// jshint node: true

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('concat', function () {
  gulp.src('src/**/*.js')
    .pipe(concat('ng-google-maps.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
  gulp.src('dist/ng-google-maps.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['concat', 'minify']);
