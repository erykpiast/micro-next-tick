'use strict';

var isNative = require('lodash.isnative');

/**
 * @variable {function|undefined} promiseResolve - reference to Promise.resolve function if it exists and is native
 * @access public
 */
// TODO: consider additional tests, like simple checking if callbacks are called in right order
// Firefox < 36 and IE TP has broken implementation of Promise.prototype.then (not based on microtask or not exactly)
// in that case will be better to fall back to original next tick
// but be careful, such test has to be async! how to deal with it?
var promiseResolve = (('function' === typeof Promise) && ('function' === typeof Promise.resolve) && isNative(Promise.resolve) ?
    Promise.resolve :
    undefined);

module.exports = {
    run: promiseResolve
};