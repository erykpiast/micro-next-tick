/* global describe, it, beforeEach, afterEach */

var chai = require('chai');
var spies = require('chai-spies');
var proxyquire = require('proxyquireify')(require);

var expect = chai.expect;
var assert = chai.assert;
chai.use(spies);


var nextTick = proxyquire('../index', {
    'lodash.isnative': chai.spy(function() {
        return true;
    })
});


describe('nextTick module API test', function() {

    it('Should be a function that accepts function as a first argument', function() {
        assert.isFunction(nextTick);

        assert.doesNotThrow(function() {
            nextTick(chai.spy());
        });
    });


    describe('instantiating', function() {

        it('Should use Object.observe if available', function() {

            beforeEach(function() {
                Object.observe = function() { };
            });

            assert.throws(function() {
                nextTick();
            }, /is not a function$/);

            assert.throws(function() {
                nextTick(null);
            }, /is not a function$/);

            assert.throws(function() {
                nextTick('');
            }, /is not a function$/);

            assert.throws(function() {
                nextTick({ call: function() { } });
            }, /is not a function$/);
        });

    });


    describe('error handling', function() {

        it('Should throw if the first argument is not a function', function() {
            assert.throws(function() {
                nextTick();
            }, /is not a function$/);

            assert.throws(function() {
                nextTick(null);
            }, /is not a function$/);

            assert.throws(function() {
                nextTick('');
            }, /is not a function$/);

            assert.throws(function() {
                nextTick({ call: function() { } });
            }, /is not a function$/);
        });

    });

});
