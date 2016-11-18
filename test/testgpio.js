var chai = require('chai');
var expect = chai.expect;
var gpio = require('../util/hack-gpio');

describe('gpio', function() {
    it('opens a gpio port', function() {
        gpio.open();
        expect(gpio.opened).to.equal(true);
    })
})