'use strict';

var ObjectObserve = require('./microtasks/object-observe');
var PromiseResolve = require('./microtasks/promise-resolve');
var assertIsFunction = require('../assert-is-function');

/**
 * @constructor MicrotaskScheduler - util for scheduling functions with microtask precision
 * @param {Function} fn - function to schedule
 */
function MicrotaskScheduler(fn) {
    assertIsFunction(fn);

    var disposed = false;
    var assertNotDisposed = function() {
        if(disposed) {
            throw new Error('instance was disposed and is not longer available to use');
        }
    };


    if(ObjectObserve.run) {
        var obj = { prop: 1 };

        ObjectObserve.run(obj, fn);

        /**
         * @method schedule - triggers calling function in next microtask
         * @access public
         * @return {MicrotaskScheduler} current instance
         */
        this.schedule = function() {
            assertNotDisposed();

            obj.prop = -obj.prop;
        };

        /**
         * @method dispose - dispose instance, any of its method is not available after that
         * @access public
         */
        this.dispose = function() {
            assertNotDisposed();

            ObjectObserve.stop(obj, fn);

            obj = null;
            fn = null;

            disposed = true;
        };

        return this;
    }

    if(PromiseResolve.run) {
        var resolvedPromise = PromiseResolve.run();

        /**
         * @method schedule - triggers calling function in next microtask
         * @access public
         * @return {MicrotaskScheduler} current instance
         */
        this.schedule = function() {
            assertNotDisposed();

            resolvedPromise
            .then(fn);
        };

        /**
         * @method dispose - dispose instance, any of its method is not available after that
         * @access public
         */
        this.dispose = function() {
            assertNotDisposed();

            resolvedPromise = null;
            fn = null;

            disposed = true;
        };

        return this;
    }

    throw new Error('no microtask implementation available');
}


module.exports = MicrotaskScheduler;
