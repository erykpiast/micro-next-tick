'use strict';

module.exports = {
    src: {
        js: {
            files: [ './src/**/*.js', '!./src/**/spec/**/*.js' ],
            main: './src/index.js'
        }
    },
    dist: {
        dir: './dist',
        js: {
            dir: './dist',
            bundleName: 'micro-next-tick.js'
        }
    },
    test: {
        files: './src/**/spec/**/*.spec.js',
        bundle: {
            name: 'tests.js',
            dir: './dist'
        },
        runtimeFiles: [ './test/phantomjs-extensions.js' ],
        runnerConfig: './karma.conf.js'
    }
}
