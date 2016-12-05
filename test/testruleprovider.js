var chai = require('chai');
var expect = chai.expect;
var RuleProvider = require('../product/ruleprovider');
var Rule = require('../product/rule');
var config = require('../config.json');
var Random = require('./random');
var GPIO = require('../util/gpio');
var pinstate = require('../util/gpio').pinstate;

describe("ruleprovider", () => {
    describe("addrule", () => {
        it("Tests adding a rule", () => {
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

    describe("applyrule", () => {
        it("Tests applying a rule", () => {
            var gpio = new GPIO();
            var provider = new RuleProvider(gpio);
            var item = getrule();
            item.time = new Date();
            provider.rules.push(getrule());
            // TODO: write test
            provider.apply();
            expect(provider.getgpio().getstate()).to.equal(gpio.pinstate.on);

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