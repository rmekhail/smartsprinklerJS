var chai = require('chai');
var expect = chai.expect;
var RuleProvider = require('../product/ruleprovider');
var Rule = require('../product/rule');
var config = require('../config.json');
var Random = require('./random');
var Gpio = require('../util/gpio');
var pinstate = require('../util/gpio').pinstate;

describe('RuleProvider', () => {
    before('set test defaults', () =>{        
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
    
    describe('.addRule(item)', function() {
        it('should add a rule', () => {
            var provider = new RuleProvider(new Gpio());
            //time, duration, rainlevel, repeat

            var item = new getRule();

            provider.addRule(item);
            var rules = provider.getRules();
            expect(rules[0].time).to.equal(item.time);
            expect(rules[0].duration).to.equal(item.duration);
            expect(rules[0].rainLevel).to.equal(item.rainLevel);
            expect(rules[0].repeat).to.equal(item.repeat);
        })
    });

    describe('.applyRule()', () => {
        it('should apply a rule and turn on', () => {
            var gpio = new Gpio();
            var provider = new RuleProvider(gpio);
            var item = getRule();
            item.time = new Date();
            provider.addRule(item);
            
            provider.apply();
            expect(provider.getGpio().getState()).to.equal(gpio.pinState.on);
        })
    });

    describe('.applyRule()', () => {
        it('should apply a rule and set a delay', () => {
            var gpio = new Gpio();
            var provider = new RuleProvider(gpio);
            var item = getRule();
            item.time = new Date();
            provider.addRule(item);
            provider.setForecast({"rainLevel": item.rainLevel});
            provider.apply();
            expect(gpio.getState()).to.equal(gpio.pinState.closed);
            expect(provider.isDelayed()).to.equal(true);
            expect(provider.getDelayDuration()).to.equal(item.duration);

        })
    });
});


function getRule() {
    var item = new Rule (
                    Random.date(),
                    Random.integer(0, 100),
                    Random.real(0.0, 3.5),
                    Random.boolean());
    return item;
}