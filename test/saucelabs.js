var browserslist = require('browserslist');
var assign = require('lodash.assign');

process.env.SAUCE_USERNAME = 'erykpiast';
process.env.SAUCE_ACCESS_KEY = '67de5a2a-5ac4-4dc3-a38a-0871f8e2ae80';

var sauceConfigs = {
    'firefox': {
        browserName: 'firefox',
        platform: 'Windows 8.1',
    },
    'chrome': {
        browserName: 'chrome',
        platform: 'Windows 8.1',
    },
    'opera': {
        browserName: 'opera',
        platform: 'Windows 7'
    },
    'android': {
        browserName: 'android',
        platform: 'Linux',
        device: 'Android Emulator'
    },
    'ios_saf': {
        browserName: 'iphone',
        platform: 'OS X 10.10',
        device: 'iPhone Simulator'
    },
    'safari 8': {
        browserName: 'safari',
        platform: 'OS X 10.10'
    },
    'safari 7': {
        browserName: 'safari',
        platform: 'OS X 10.9'
    },
    'safari 6': {
        browserName: 'safari',
        platform: 'OS X 10.8'
    },
    'safari 5.1': {
        browserName: 'safari',
        platform: 'OS X 10.6'
    },
    'ie 11': {
        browserName: 'internet explorer',
        platform: 'Windows 8.1'
    },
    'ie 10': {
        browserName: 'internet explorer',
        platform: 'Windows 8'
    },
    'ie 9': {
        browserName: 'internet explorer',
        platform: 'Windows 7'
    },
    'ie 8': {
        browserName: 'internet explorer',
        platform: 'Windows 7'
    },
    'ie 7': {
        browserName: 'internet explorer',
        platform: 'Windows XP'
    },
    'ie 6': {
        browserName: 'internet explorer',
        platform: 'Windows XP'
    }
};

function _createLaunchers(browsers) {
    var launchers = {};

    browsers.forEach(function(browser) {
        var sauceConfig = (
            sauceConfigs[browser.name + ' ' + browser.version] ||
            sauceConfigs[browser.name + ' ' + browser.majorVersion] ||
            sauceConfigs[browser.name]
        );

        if(sauceConfig) {
            launchers['SL_' + browser.name + '_' + browser.version] = assign({}, sauceConfig, {
                base: 'SauceLabs',
                version: browser.version
            });
        }
    });

    return launchers;
}


function createConfig(pattern) {
    var browsers = browserslist(pattern).map(function(browser) {
        // remove first part from version ranges
        return {
            name: browser.split(' ')[0].toLowerCase(),
            version: browser.split(' ')[1].split('-').reverse()[0],
            majorVersion: browser.split(' ')[1].split('-').reverse()[0].split('.')[0]
        };
    });

    var launchers = _createLaunchers(browsers);

    return {
        launchers: launchers,
        browsers: Object.keys(launchers)
    };
}


module.exports = createConfig;