'use strict';

var Queue = require('./queue');
var MicrotaskScheduler = require('./microtask-scheduler');
var originalNextTick = require('./original-next-tick');
var assertIsFunction = require('./assert-is-function');

var queue = new Queue();
var call = function(fn) { fn(); };

var scheduler;
try {
    scheduler = new MicrotaskScheduler(function() {
        queue.drain(call);
    });
} catch(err) { }

if(scheduler) {
    module.exports = function nextTick(fn) {
        assertIsFunction(fn);

        queue.add(fn);

        // schedule draining on first element
        if (queue.length === 1) {
            scheduler.schedule();
        }
    };
} else if(originalNextTick) {
    // if microtask scheduling is not available
    // and original nextTick implementation is, fall back to it
    // in Browserify it has queue draining mechanism that fits better for setTimeout
    module.exports = function nextTick(fn) {
        assertIsFunction(fn);

        originalNextTick(fn);
    };

    queue = null; // queue is not needed
} else {
    // without original nextTick from Browserify we can't do much more
    // than reimplementing it here, but is overcomplication
    // use setTimeout instead of throwing error for non-browserify enviroments
    module.exports = function nextTick(fn) {
        assertIsFunction(fn);

        setTimeout(fn, 0);
    };
}
