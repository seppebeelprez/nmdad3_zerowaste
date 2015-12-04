'use strict';

var gulp = require("gulp");
var concat = require("gulp-concat");
var notify = require("gulp-notify");



gulp.task('scripts', function(){
    gulp.src([  '../node_modules/jquery/dist/jquery.min.js',
                '../node_modules/chart.js/Chart.min.js'])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('scripts'));

    gulp.src('../node_modules/material-design-lite/material.min.js')
        .pipe(concat('material.min.js'))
        .pipe(gulp.dest('scripts'));

    gulp.src('assets/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('scripts'))
        .pipe(notify({ message: 'JavaScript concatinated!'}));

});