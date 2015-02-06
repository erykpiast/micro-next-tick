'use strict';

var ObjectObserve = require('./microtasks/object-observe');
var PromiseResolve = require('./microtasks/promise-resolve');


function MicrotaskScheduler(fn) {
    if(ObjectObserve) {
        var obj = { prop: 1 };

        ObjectObserve(obj, fn);

        this.schedule = function() {
            obj.prop = -obj.prop;
        };

        return;
    }

    if(PromiseResolve) {
        var resolvedPromise = PromiseResolve();

        this.schedule = function() {
            resolvedPromise
            .then(fn);
        };

        return;
    }

    throw new Error('no microtask implementation available');
}


module.exports = MicrotaskScheduler;
