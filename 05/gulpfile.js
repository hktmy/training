// Copyright:: Copyright (c) 2015 Ricoh Company, Ltd. All Rights Reserved.

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = {
  lint: [ './*.js', './src/**/*.js', './test/**/*.js' ],
  tests: ['./test/**/*.js']
};

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// gulp.task('test', ['lint'], function() {
gulp.task('test', function() {
  return gulp.src(paths.tests)
    .pipe(mocha({ reporter: 'spec' }));
});
