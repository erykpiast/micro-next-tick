/**
 * @variable {function|undefined} originalNextTick - reference to original process.nextTick function
 * @type {[type]}
 */
var originalNextTick = ('undefined' !== typeof process && 'function' === typeof process.nextTick ?
    process.nextTick :
    undefined);

module.exports = originalNextTick;