'use strict';

// the version of ui-router-menu-service
var version = require('./package.json').version;

// gulp and dependencies
var gulp = require('gulp'),
    // used to merge the package version
    replace = require('gulp-replace'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    minificationOptions = {
        output: {},
        preserveComments: 'some'
    };

gulp.task('package-libs', function () {
    return gulp.src(['index.js'])
        // sets the package version numbers
        .pipe(replace('@ui-router-menu-service_version', 'v' + version))
        .pipe(concat('ui-router-menu-service.' + version + '.js'))
        .pipe(minify(minificationOptions))
        .pipe(gulp.dest('libs'))
});
