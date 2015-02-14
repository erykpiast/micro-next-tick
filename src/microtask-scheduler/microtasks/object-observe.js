'use strict';

var isNative = require('lodash.isnative');

/**
 * @variable {function|undefined} objectObserve - reference to Object.observe function if it exists and is native
 * @access public
 */
var objectObserve = (('function' === typeof Object.observe) && isNative(Object.observe) ?
    Object.observe :
    undefined);

/**
 * @variable {function|undefined} objectUnobserve - reference to Object.observe function if it exists and is native
 * @access public
 */
var objectUnobserve = (('function' === typeof Object.unobserve) && isNative(Object.unobserve) ?
    Object.unobserve :
    undefined);

module.exports = {
    run: objectObserve,
    stop: objectUnobserve
};