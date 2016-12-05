'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create('sync');
const reload = browserSync.reload;
const csscomb = require('gulp-csscomb');

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(csscomb())
        .pipe(sass())
        .pipe(concat("./styles.css"))
        .pipe(gulp.dest('public'))
        .pipe(reload({stream:true}))

});

gulp.task('html', function(){
   gulp.src('src/index.html')
       .pipe(gulp.dest('public'))
       .pipe(reload({stream:true}))
});

gulp.task('clean', function(){
    return del('public');
});

gulp.task('build', ['clean', 'styles', 'html', 'browserSync']);

gulp.task('browserSync', function() {
    browserSync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'public',
            directory: true
        }
    });
});

gulp.task('default', ['build'], function() {
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/*.html', ['html']);
});