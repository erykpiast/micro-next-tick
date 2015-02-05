'use strict';

var isNative = require('lodash.isnative');

var originalNextTick = ('undefined' !== typeof process && 'function' === typeof process.nextTick ? process.nextTick : undefined);
var objectObserveAvailable = ('function' === typeof Object.observe) && isNative(Object.observe);
var promiseResolveAvailable = ('undefined' !== typeof Promise) && ('function' === typeof Promise.resolve) && isNative(Promise.resolve);


function createScheduler(fn) {
    if(objectObserveAvailable) {
        var obj = { prop: 1 };

        Object.observe(obj, fn);
        
        return function() {
            obj.prop = -obj.prop;
        };
    }

    if(promiseResolveAvailable) {
        var resolvedPromise = Promise.resolve();

        return function() {
            resolvedPromise
            .then(fn);
        };
    }

    return undefined;
}


module.exports = createScheduler;
