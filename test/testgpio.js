var chai = require('chai');
var expect = chai.expect;
var Gpio = require('../util/gpio');
var config = require('../config.json');

describe('gpio', function() {

    before('Sets defaults', function(){
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

    describe('.open()', function() {
        it('should open a gpio port', function() {
        var gpio = new Gpio();
        gpio.open();
        expect(gpio.getState()).to.equal(gpio.pinState.open);
        })
    });
    
    describe('.on()', function() {
        it('should turn on a gpio port', function() {
        var gpio = new Gpio();
        gpio.on();
        expect(gpio.getState()).to.equal(gpio.pinState.on);
        })
    });
});