'use strict';

module.exports = function assertIsFunction(value) {
    var type = typeof value;
    if(type !== 'function') {
        throw new TypeError(type + ' is not a function');
    }

    return true;
}
