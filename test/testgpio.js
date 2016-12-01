var chai = require('chai');
var expect = chai.expect;
var GPIO = require('../util/gpio');
var config = require('../config.json');

describe('gpio', function() {
    beforeEach(function() {
        config.gpiopath = "/dev/null";
        config.gpioexport = "/dev/null";
        config.gpiounexport = "/dev/null";
        config.gpiodirection = "/dev/null";
        config.gpioswitchvalue = "/dev/null";
    })

    describe('.open()', function() {
        it('should open a gpio port', function() {
        var gpio = new GPIO();
        var isReadyFunc = gpio.open();
        expect(isReadyFunc.call(gpio)).to.equal(true);
        })
    })
    
    describe('.on()', function() {
        it('should turn on a gpio port', function() {
        var gpio = new GPIO();
        var isOnFunc = gpio.on();
        expect(isOnFunc.call(gpio)).to.equal(true);
        })
    })
});