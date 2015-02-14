'use strict';

/**
 * @function assertIsFunction - throws if passed value is not a function
 * @param  {*} value - value to check
 * @return {*} true if value is a function, undefined if it's not
 */
function assertIsFunction(value) {
    var type = typeof value;
    if(type !== 'function') {
        throw new TypeError(type + ' is not a function');
    }

    return true;
}

module.exports = assertIsFunction;