'use strict';

var isNative = require('lodash.isnative');

/**
 * @variable {function|undefined} promiseResolve - reference to Promise.resolve function if it exists and is native
 * @access public
 */
// TODO: consider additional tests, like simple checking if callbacks are called in right order
// but be careful, they have to be async!
var promiseResolve = (('object' === typeof Promise) && ('function' === typeof Promise.resolve) && isNative(Promise.resolve) ?
    Promise.resolve :
    undefined);

module.exports = {
    run: promiseResolve
};