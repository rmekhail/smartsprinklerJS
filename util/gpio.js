var exec = require('child-process-promise').exec;
var Enum = require('enum');
var config = require('../config');
'use strict'

var Gpio = function(){
	this.gpioState = Gpio.prototype.pinState.closed;	
}

Gpio.prototype.pinState = new Enum(['closed', 'open', 'on', 'onwithduration']);

Gpio.prototype.getState = (() => {
		console.log(`returning state: ${this.gpioState}`);
		return this.gpioState;
	});


Gpio.prototype.open = (() => {
		console.log(`opening gpio port ${config.pin}`);
		exec(`echo ${config.pin} > ${config.gpioexport}`)
			.then((result) => {
				console.log(`gpio pin ${config.pin} opened:`);// ${result.stdout}`);
			})
			.catch((err) => {
				console.log(`Error initializing gpio pin ${config.pin}: ${err}`);
			});
		exec(`echo out > ${config.gpiodirection}`)
			.catch((err) => {
				console.log(`Error opening gpio pin ${config.pin}: ${err}`);
			});
			this.gpioState = Gpio.prototype.pinState.open;
			console.log(`gpio pin ${config.pin} set up and ready = ${this.gpioState}`);
			
		});
Gpio.prototype.close = (() => {
		exec(`echo ${config.pin} > ${config.gpiounexport}`)
			.then(((result) => {
				this.gpioState = Gpio.prototype.pinState.closed;
				console.log(`closing ${config.pin} in ${this}`);
			}))
			.catch((err) => {
				console.log('Error closing gpio pin: ' + err);
			});
	});
Gpio.prototype.on = (() => {
		console.log(`called on in object ${this}`);
		if(!(this.gpioState === Gpio.prototype.pinState.open))
			this.open();
		exec(`echo 1 > ${config.gpioswitchvalue}`)
			.then((result) => {
				this.on = true;
			})
			.catch((err) => {
				console.log('Error turning on LED: ' + err);
			});

		this.gpioState = Gpio.prototype.pinState.on;
	});
Gpio.prototype.onWithDuration = ((duration, off) => {
		console.log(`called onwithduration in object ${this}`);
		this.on();
		setInterval(duration, off());
	});
Gpio.prototype.off = (() => {
		console.log(`called off in object ${this}`);
		exec(`echo 0 > ${config.gpioswitchvalue}`)
			.catch((err) => {console.log('Error turning off LED: ' + err);});
		Gpio.prototype.close();
	});

module.exports = Gpio;
