'use strict';


/**
 * @constructor Queue - simple, synchronous queue of anything
 */
function Queue() {
    var queue = [];
    var length = 0;

    /**
     * @method drain - flush queue; when called during draining,
     *     nothing changes
     * @access public
     * @param {function} interceptor - function that should be called for each queue element
     * @param {*} thisArg - context within which interceptor should be called
     * @returns {Queue} current instance
     */
    this.drain = function drain(interceptor, thisArg) {
        var currentQueue = queue;
        queue = []; // values that are going to be scheduled in current queue get their own, fresh queue
        length = 0;

        for(var i = 0, len = currentQueue.length; i < len; i++) {
            interceptor.call(thisArg || null, currentQueue[i]);
        }

        return this;
    };

    /**
     * @method drain - add element to queue; when called during draining,
     *     value is added to new, fresh queue
     * @access public
     * @param {*} element - value that should be added to the queue
     * @returns {Queue} current instance
     */
    this.add = function add(element) {
        queue.push(element);

        length++;

        return this;
    };

    /**
     * @property length - current length of queue; when called during draining,
     *     it's length of new queue, created before it
     * @access public
     * @readonly
     */
    Object.defineProperty(this, 'length', {
        get: function() {
            return length;
        },
        set: function() {
            throw new TypeError('Cannot assign to read only property \'length\' of ' + this.toString());
        }
    });
}

module.exports = Queue;
