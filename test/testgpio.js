var chai = require('chai');
var expect = chai.expect;
var gpio = require('../util/gpio');
var config = require('../config.json');

describe('gpio', function() {
    it('opens a gpio port', function() {
        config.gpiopath = "/dev/null";
        config.gpioexport = "/dev/null";
        config.gpiounexport = "/dev/null";
        config.gpiodirection = "/dev/null";
        config.gpioswitchvalue = "/dev/null";
        gpio.open();
        expect(gpio.isready()).to.equal(true);
    })
})