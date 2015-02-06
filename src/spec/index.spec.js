/* global describe, it, beforeEach, afterEach */

var chai = require('chai');
var spies = require('chai-spies');
var proxyquire = require('proxyquireify')(require);

var assert = chai.assert;
chai.use(spies);


var nextTick = proxyquire('../index', { });


describe('nextTick module API test', function() {

    it('Should be a function that accepts function as a first argument', function() {
        assert.isFunction(nextTick);

        assert.doesNotThrow(function() {
            nextTick(chai.spy());
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
