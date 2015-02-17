var saucelabs = require('./test/saucelabs');
var sauceConf = saucelabs('> 1%, last 4 versions, Firefox ESR, Opera 12.1');
// var sauceConf = saucelabs('last 4 Safari versions, last 4 IE versions, last 4 Chrome versions, last 4 Firefox versions, Opera 12.1');

module.exports = function (config) {
    config.set({
        basePath: '.',

        frameworks: [ 'mocha' ],

        files: [ /* definition in gulpfile */ ],

        reporters: [ 'mocha', 'saucelabs' ],
        colors: true,
        logLevel: config.LOG_INFO,

        port: 9876,
        autoWatch: false,

        customLaunchers: sauceConf.launchers,
        browsers: sauceConf.browsers,

        sauceLabs: {
            // username: 'erykpiast',
            // accessKey: '67de5a2a-5ac4-4dc3-a38a-0871f8e2ae80',
            connectOptions: {
                testName: 'Micro nextTick unit test',
                verbose: true,
                port: 4000
            }
        },

        singleRun: true,

        browserDisconnectTimeout: 30 * 1000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 30 * 1000,
        captureTimeout: 120 * 1000
    });
};