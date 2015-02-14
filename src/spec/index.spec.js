/* global describe, it, beforeEach, afterEach */

var chai = require('chai');
var spies = require('chai-spies');
var proxyquire = require('proxyquireify')(require);

var expect = chai.expect;
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

describe('nextTick scheduling test', function() {
    var microscheduled;

    beforeEach(function() {
        microscheduled = chai.spy();
    });

    afterEach(function() {
        microscheduled = null;
    });


    it('Should call scheduled function before setTimeout callback', function(done) {
        nextTick(microscheduled);

        setTimeout(function() {
            expect(microscheduled).to.have.been.called();

            done();
        }, 0);
    });


    describe('nested calling', function() {
        var microscheduled1;
        var microscheduled11;
        var microscheduled12;
        var microscheduled121;

        beforeEach(function() {
            microscheduled1 = chai.spy(function() {
                nextTick(microscheduled11);
                nextTick(microscheduled12);
            });
            microscheduled11 = chai.spy();
            microscheduled12 = chai.spy(function() {
               nextTick(microscheduled121); 
            });
            microscheduled121 = chai.spy();
        });

        afterEach(function() {
            microscheduled1 = microscheduled11 = microscheduled12 = microscheduled121 = null;
        });

        it('Should call all scheduled function before setTimeout callback', function(done) {
            nextTick(microscheduled1);
            
            setTimeout(function() {
                expect(microscheduled1).to.have.been.called();
                expect(microscheduled11).to.have.been.called();
                expect(microscheduled12).to.have.been.called();
                expect(microscheduled121).to.have.been.called();

                done();
            }, 0);
        });
    });

});