var chai = require('chai');
var expect = chai.expect;
var ruleprovider = require('../product/ruleprovider');
var Rule = require('../product/rule');
var config = require('../config.json');
var Random = require('./random');

describe("ruleprovider", function() {
    describe('.addrule(item)', function() {
        it("should add a rule", () => {
            var provider = new ruleprovider();
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
        it("should apply a rule", () => {
            var provider = new ruleprovider();
            var rule = getrule();
            rule.time = new Date();
            provider.rules.push(rule);
            provider.apply();

            // TODO: write test
            expect(provider.getgpio().ison()).to.equal(true);
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