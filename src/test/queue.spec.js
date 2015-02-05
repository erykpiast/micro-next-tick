/* global describe, it, beforeEach, afterEach */

var chai = require('chai');
var spies = require('chai-spies');

var assert = chai.assert;
chai.use(spies);

var Queue = require('../queue');


describe('Queue module API test', function() {

    it('Should be a function that can be instantiated', function() {
        assert.isFunction(Queue);
        assert.doesNotThrow(function() {
            new Queue();
        });
    });

});

describe('Queue instance API test', function() {
    var queue;

    beforeEach(function() {
        queue = new Queue();
    });

    it('Should has a bunch of methods', function() {
        assert.isFunction(queue.add);
        assert.isFunction(queue.drain);
    });

    it('Should has numerical length property', function() {
        assert.isNumber(queue.length);
    });

});

describe('Queue instance test', function() {
    var queue;

    beforeEach(function() {
        queue = new Queue();
    });

    describe('add method', function() {

        it('Should calling add method increase the length', function() {
            queue.add(function() { });
            assert.equal(queue.length, 1);

            queue.add(function() { });
            assert.equal(queue.length, 2);
        });

    });


    describe('drain method', function() {
        var fn1 = chai.spy();
        var fn2 = chai.spy();
        var fn3 = chai.spy();

        beforeEach(function() {
            queue.add(fn1);
            queue.add(fn2);
            queue.add(fn3);
        });

        it('Should calling drain method set the length to 0', function() {
            assert.equal(queue.length, 0);
        });

        it('Should calling drain method call each function added to queue exactly one time', function() {
            assert.equal(queue.length, 0);
        });

    });

});
