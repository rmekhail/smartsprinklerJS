var chai = require('chai');
var expect = chai.expect;
var RuleProvider = require('../product/ruleprovider');
var Rule = require('../product/rule');
var config = require('../config.json');
var Random = require('./random');
var GPIO = require('../util/gpio');
var pinstate = require('../util/gpio').pinstate;

describe("ruleprovider", () => {
    before("set test defaults", () =>{        
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
    
    describe('.addrule(item)', function() {
        it("should add a rule", () => {
            var provider = new RuleProvider(new GPIO());
            //time, duration, rainlevel, repeat

            var item = new getrule();

            provider.addrule(item);
            var rules = provider.getrules();
            expect(rules[0].time).to.equal(item.time);
            expect(rules[0].duration).to.equal(item.duration);
            expect(rules[0].rainlevel).to.equal(item.rainlevel);
            expect(rules[0].repeat).to.equal(item.repeat);
        })
    });

    describe(".applyrule()", () => {
        it("should apply a rule and turn on", () => {
            var gpio = new GPIO();
            var provider = new RuleProvider(gpio);
            var item = getrule();
            item.time = new Date();
            provider.addrule(item);
            
            provider.apply();
            expect(provider.getgpio().getstate()).to.equal(gpio.pinstate.on);
        })
    });

    describe(".applyrule()", () => {
        it("should apply a rule and set a delay", () => {
            var gpio = new GPIO();
            var provider = new RuleProvider(gpio);
            var item = getrule();
            item.time = new Date();
            provider.addrule(item);
            provider.setforecast({"rainlevel": item.rainlevel});
            provider.apply();
            expect(gpio.getstate()).to.equal(gpio.pinstate.closed);
            expect(provider.isdelayed()).to.equal(true);
            expect(provider.getdelayduration()).to.equal(item.duration);

        })
    });
});


function getrule() {
    var item = new Rule (
                    Random.date(),
                    Random.integer(0, 100),
                    Random.real(0.0, 3.5),
                    Random.boolean());
    return item;
}