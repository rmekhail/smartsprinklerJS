var chai = require('chai');
var expect = chai.expect;
var GPIO = require('../util/gpio');
var config = require('../config.json');

describe('gpio', function() {
    before("Sets defaults", function(){
        var platform = process.platform;
        var defaultconfig = '/dev/null';
        if(platform === 'win32'){
            defaultconfig = 'NUL';
        }
        config.pin = 0;
        config.gpiopath = defaultconfig;
        config.gpioexport = defaultconfig;
        config.gpiounexport = defaultconfig;
        config.gpiodirection = defaultconfig;
        config.gpioswitchvalue = defaultconfig;
    });

    it('opens a gpio port', function() {
        var gpio = new GPIO();
        gpio.open();
        expect(gpio.getstate()).to.equal(gpio.pinstate.open);
    });

    it('sets a gpio pin on', function(){
        var gpio = new GPIO();
        gpio.on();
        expect(gpio.getstate()).to.equal(gpio.pinstate.on);
    })
});