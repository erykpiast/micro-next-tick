/* global describe, it, beforeEach, afterEach */

var chai = require('chai');
var spies = require('chai-spies');

var expect = chai.expect;
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

    afterEach(function() {
        queue = null;
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

    afterEach(function() {
        queue = null;
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
        var fn1, fn2, fn3;
        var interceptor = function call(fn) { fn(); };

        beforeEach(function() {
            fn1 = chai.spy();
            fn2 = chai.spy();
            fn3 = chai.spy();

            queue.add(fn1);
            queue.add(fn2);
            queue.add(fn3);
        });

        afterEach(function() {
            fn1 = fn2 = fn3 = null;
        });


        it('Should calling drain method set the length to 0', function() {
            queue.drain(interceptor);

            assert.equal(queue.length, 0);
        });

        it('Should calling drain method call each function added to queue exactly one time', function() {
            queue.drain(interceptor);

            expect(fn1).to.have.been.called.once;
            expect(fn2).to.have.been.called.once;
            expect(fn3).to.have.been.called.once;
        });


        describe('nested scheduling', function() {
            var fn4, fn5;

            beforeEach(function() {
                fn5 = chai.spy();
                fn4 = chai.spy(function() {
                    queue.add(fn5);
                });

                queue.add(fn4);
            });

            afterEach(function() {
                fn4 = fn5 = null;
            });


            it('Should calling drain method set the length to 1', function() {
                queue.drain(interceptor);

                assert.equal(queue.length, 1);
            });

            it('Should do not call function scheduled in queue', function() {
                expect(fn5).to.not.have.been.called;
            });

        });

        describe('nested draining', function() {
            var fn4, fn5;

            beforeEach(function() {
                fn5 = chai.spy();
                fn4 = chai.spy(function() {
                    queue.add(fn5);
                    queue.drain(interceptor);
                });

                queue.add(fn4);
            });

            afterEach(function() {
                fn4 = fn5 = null;
            });


            it('Should calling drain method set the length to 0', function() {
                queue.drain(interceptor);

                assert.equal(queue.length, 0);
            });

            it('Should call function scheduled in queue', function() {
                expect(fn5).to.have.been.called;
            });

        });

    });

});
