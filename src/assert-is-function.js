'use strict';

/**
 * @function assertIsFunction - throws if passed value is not a function
 * @param  {*} value - value to check
 * @return {*} true if value is a function, undefined if it's not
 */
function assertIsFunction(value) {
    if (!(value instanceof Function) && typeof type !== 'function') {
        throw new TypeError(value + ' (' + typeof value + ') is not a function');
    }

    return true;
}

module.exports = assertIsFunction;
