module.exports = function (config) {
    config.set({
        basePath: '.',

        frameworks: [ 'mocha' ],

        files: [ 'dist/tests.js'/* definition in gulpfile */ ],

        reporters: [ 'mocha' ],
        colors: true,
        logLevel: config.LOG_INFO,
        
        port: 9876,
        autoWatch: false,

        browsers: [ 'Firefox', 'Chrome' ],
        singleRun: false
    });
};