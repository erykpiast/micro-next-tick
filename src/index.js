'use strict';

var isNative = require('lodash.isnative');
var Queue = require('./queue');

var originalNextTick = ('undefined' !== typeof process && 'function' === typeof process.nextTick ? process.nextTick : undefined);
var objectObserveAvailable = ('function' === typeof Object.observe) && isNative(Object.observe);
var promiseResolveAvailable = ('undefined' !== typeof Promise) && ('function' === typeof Promise.resolve) && isNative(Promise.resolve);

var queue = new Queue();

var scheduleDraining = (function() {
    if(objectObserveAvailable) {
        var obj = { prop: 1 };

        Object.observe(obj, drainQueue);

        return function() {
            obj.prop = -obj.prop;
        };
    }

    if(promiseResolveAvailable) {
        var resolvedPromise = Promise.resolve();

        return function() {
            resolvedPromise
                .then(drainQueue);
        };
    }

    if(originalNextTick) {
        return undefined;
    }

    return function() {
        setTimeout(drainQueue, 0);
    };
})();

module.exports = function nextTick(fn) {
    var type = typeof fn;
    if(type !== 'function') {
        throw new TypeError(type + ' is not a function');
    }

    if(scheduleDraining) {
        queue.add(fn);

        if (queue.length === 1) {
            scheduleDraining();
        }
    } else {
        // if microtask scheduling is not available
        // and original nextTick implementation is, fall back to it
        // it has queue draining mechanism that fits better for setTimeout
        originalNextTick(fn);
    }
};
