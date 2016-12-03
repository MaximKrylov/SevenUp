'use strict';

var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var gulp_refresh = require('gulp-livereload');
var gulp_clean = require('gulp-clean');
var gulp_sourcemaps = require('gulp-sourcemaps')
var gulp_uglify = require('gulp-uglify')
var gulp_jade = require('gulp-jade');

var lr = require('tiny-lr');
var server = lr();

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(gulp_clean());
});

gulp.task('build-js', ['clean'], function () {
    gulp.src(['src/app/angular.module.js', 'src/app/angular.routes.js', 'src/**/*.js'])
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_concat('app.js'))
        .pipe(gulp_uglify())
        .pipe(gulp_sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(gulp_refresh(server))
});

gulp.task('build-jade', ['clean'], function () {
    return gulp.src('src/**/*.jade')
        .pipe(gulp_jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp_refresh(server));
});

gulp.task('build', ['build-js', 'build-jade']);

gulp.task('lr-server', function () {
    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
});

gulp.task('deploy', ['lr-server', 'build'], function () {
    gulp.watch('src/**/*', ['build']);
});
