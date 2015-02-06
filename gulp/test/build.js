'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var glob = require('glob');
var browserify = require('browserify');
var proxyquire = require('proxyquireify');

var config = require('../config');

var bundler = (function createBundler() {
    var bundler = browserify({
            debug: true,
            entry: true
        });

    glob.sync(config.test.files).forEach(function(filePath) {
        bundler = bundler.add(filePath);
    });

    bundler.plugin(proxyquire.plugin);

    return bundler;
})();

function buildTestsTask() {
    return bundler.bundle()
    .on('error', function(err) {
        gutil.log('Browserify error:', err.message);
    })
    .pipe(source(config.test.bundle.name))
    .pipe(gulp.dest(config.test.bundle.dir));
}

module.exports = buildTestsTask;
