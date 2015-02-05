'use strict';

function Queue() {
    var queue = [];

    this.drain = function drain() {
        var currentQueue = queue;
        queue = []; // functions that are going to be scheduled in current queue get their own, fresh queue
        this.length = 0;

        for(var i = 0, len = currentQueue.length; i < len; i++) {
            currentQueue[i]();
        }
    };

    this.add = function add(fn) {
        queue.push(fn);

        this.length++;
    };

    this.length = 0;
};

module.exports = Queue;
