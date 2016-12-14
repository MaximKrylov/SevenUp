'use strict';

const gulp = require('gulp');
const gulp_babel = require('gulp-babel');
const gulp_clean = require('gulp-clean');
const gulp_concat = require('gulp-concat');
const gulp_jade = require('gulp-jade');
const gulp_refresh = require('gulp-livereload');
const gulp_sourcemaps = require('gulp-sourcemaps')
const gulp_sass = require('gulp-sass');
const gulp_uglify = require('gulp-uglify');

var lr = require('tiny-lr');
var server = lr();

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(gulp_clean());
});

gulp.task('build-js', ['clean'], function () {
    gulp.src(['src/App/Angular.Module.js', 'src/App/Angular.Routes.js', 'src/**/*.js'])
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_babel({
            presets: ['es2015']
        }))
        .pipe(gulp_concat('SevenUp.js'))
        .pipe(gulp_uglify())
        .pipe(gulp_sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp_refresh(server))
});

gulp.task('build-jade', ['clean'], function () {
    return gulp.src('src/**/*.jade')
        .pipe(gulp_jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp_refresh(server));
});

gulp.task('build-sass', ['clean'], function () {
    return gulp.src('src/Assets/Sass/SevenUp.sass')
        .pipe(gulp_sass({
            outputStyle: 'compressed',
            includePaths: ['src/Assets/Sass', 'bower_components/bootstrap-sass/assets/stylesheets']
        }).on('error', gulp_sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(gulp_refresh(server));
});

gulp.task('build', ['build-js', 'build-jade', 'build-sass']);

gulp.task('lr-server', function () {
    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
});

gulp.task('deploy', ['lr-server', 'build'], function () {
    gulp.watch('src/**/*', ['build']);
});
