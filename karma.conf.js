module.exports = function (config) {


    var configuration = {
        basePath: '.',

        frameworks: [ 'mocha' ],

        files: [ 'dist/tests.js'/* definition in gulpfile */ ],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        reporters: [ 'mocha' ],
        colors: true,
        logLevel: config.LOG_INFO,
        
        port: 9876,
        autoWatch: false,

        browsers: [ 'Firefox', 'Chrome' ],
        singleRun: false
    };

    if(process.env.TRAVIS){
        configuration.browsers = configuration.browsers.map(function(browser) {
            return (browser === 'Chrome' ? 'Chrome_travis_ci' : browser);
        });
    }


    config.set(configuration);
};