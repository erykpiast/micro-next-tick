'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

var config = require('./gulp/config');

gulp.task('lint', require('./gulp/lint'));

gulp.task('test:lint', require('./gulp/test/lint'));
gulp.task('test:build', require('./gulp/test/build'));
gulp.task('test:run', require('./gulp/test/run'));
gulp.task('test', function(cb) {
    runSequence(
        [ 'lint', 'test:lint' ],
        'test:build',
        'test:run',
        function() {
            gutil.log('test task finished');

            cb();
        }
    );
});
gulp.task('test-dev', function() {
    // concatenating order matters, config.src.js.files has negative matching for test files
    gulp.watch(config.src.js.files.concat(config.test.files), [ 'test' ]);
    gulp.start('test');
});

gulp.task('default', [ 'test-dev' ]);
