var chai = require('chai');
var expect = chai.expect;
var GPIO = require('../util/gpio');
var config = require('../config.json');

describe('gpio', function() {
    it('opens a gpio port', function() {
        var gpio = new GPIO();
        testConfig();
        var isReadyFunc = gpio.open();
        expect(isReadyFunc.call(gpio)).to.equal(true);
    })
});

describe('gpio', function() {
    it('turns on a gpio port', function() {
        var gpio = new GPIO();
        testConfig();
        var isOnFunc = gpio.on();
        expect(isOnFunc.call(gpio)).to.equal(true);
    })
});

var testConfig = function() {
    config.gpiopath = "/dev/null";
    config.gpioexport = "/dev/null";
    config.gpiounexport = "/dev/null";
    config.gpiodirection = "/dev/null";
    config.gpioswitchvalue = "/dev/null";
}