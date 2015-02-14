/* global describe, it, beforeEach, afterEach */

var chai = require('chai');
var spies = require('chai-spies');
var proxyquire = require('proxyquireify')(require);

var expect = chai.expect;
var assert = chai.assert;
chai.use(spies);


var ObjectObserveMock = {
    run: chai.spy(),
    stop: chai.spy()
};

var PromiseThenMock = chai.spy();
var PromiseResolveMock = {
    run: chai.spy(function() {
        return {
            then: PromiseThenMock
        };
    })
};


var MicrotaskScheduler = proxyquire('../index', {
    './microtasks/object-observe': ObjectObserveMock,
    './microtasks/promise-resolve': PromiseResolveMock
});


describe('MicrotaskScheduler module API test', function() {

    it('Should be a function that can be instantiated', function() {
        assert.isFunction(MicrotaskScheduler);

        assert.doesNotThrow(function() {
            new MicrotaskScheduler(chai.spy());
        });
    });


    describe('error handling', function() {

        it('Should throw is passed argument is not a function', function() {
            assert.throws(function() {
                new MicrotaskScheduler();
            }, /is not a function$/);

            assert.throws(function() {
                new MicrotaskScheduler(null);
            }, /is not a function$/);

            assert.throws(function() {
                new MicrotaskScheduler('');
            }, /is not a function$/);

            assert.throws(function() {
                new MicrotaskScheduler({ call: function() { } });
            }, /is not a function$/);
        });

    });


    describe('microtask implementations', function() {
        var scheduled = chai.spy();
        var ObjectObserveMockFn;
        var PromiseResolveMockFn;

        beforeEach(function() {
            ObjectObserveMockFn = ObjectObserveMock.run;
            PromiseResolveMockFn = PromiseResolveMock.run;
        });

        afterEach(function() {
            ObjectObserveMock.run = ObjectObserveMockFn;
            PromiseResolveMock.run = PromiseResolveMockFn;
        });


        it('Should prefer Object.observe', function() {
            new MicrotaskScheduler(scheduled);

            expect(ObjectObserveMockFn).to.have.been.called();
            expect(ObjectObserveMockFn).to.have.been.called.with(scheduled);
        });

        it('Should use only one implementation', function() {
            new MicrotaskScheduler(scheduled);

            expect(ObjectObserveMockFn).to.have.been.called();
            expect(PromiseResolveMockFn).not.to.have.been.called();
        });

        it('Should use Promise.resolve when Object.observe is not available', function() {
            ObjectObserveMock.run = null;

            (new MicrotaskScheduler(scheduled)).schedule();

            expect(PromiseResolveMockFn).to.have.been.called();
            expect(PromiseThenMock).to.have.been.called.with(scheduled);
        });


        describe('error handling', function() {
            beforeEach(function() {
                ObjectObserveMock.run = PromiseResolveMock.run = null;
            });

            it('Should throw if any of microtask implementations is available', function() {
                assert.throws(function() {
                    new MicrotaskScheduler(chai.spy());
                }, /microtask implementation/);
            });

        });

    });

});


describe('MicrotaskScheduler instance test', function() {
    var scheduler;

    beforeEach(function() {
        scheduler = new MicrotaskScheduler(chai.spy());
    });

    afterEach(function() {
        scheduler = false;
    });


    it('Should have `schedule` and `dispose` methods', function() {
        assert.isFunction(scheduler.schedule);
        assert.isFunction(scheduler.dispose);
    });

    it('Should prevent calling methods when `dispose` was called', function() {
        scheduler.dispose();

        assert.throws(function() {
            scheduler.schedule();
        }, /was disposed/);

        assert.throws(function() {
            scheduler.dispose();
        }, /was disposed/);
    });

});
