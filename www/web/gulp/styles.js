'use strict';

var gulp = require ("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-ruby-sass");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");


gulp.task('styles', function() {
    return sass('assets/stylesheets/main.scss', { style : 'expanded' })
        .pipe(autoprefixer('last 5 version'))
        .pipe(gulp.dest('styles'))
        .pipe(notify({ message: "Sass compiled"}))
});

gulp.task('extra', function() {
    gulp.src(['../node_modules/material-design-lite/material.css'])
        .pipe(concat('material.css'))
        .pipe(gulp.dest('styles'));
});



