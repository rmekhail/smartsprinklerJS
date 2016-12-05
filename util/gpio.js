var exec = require("child-process-promise").exec;
var Enum = require("enum");
var config = require("../config");
"use strict"


var GPIO = function(){
	this.gpiostate = GPIO.prototype.pinstate.closed;	
}

GPIO.prototype.pinstate = new Enum(['closed', 'open', 'on', 'onwithduration']);

GPIO.prototype.getstate = (() => {
		console.log(`returning state: ${this.gpiostate}`);
		return this.gpiostate;
	});


GPIO.prototype.open = (() => {
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
			this.gpiostate = GPIO.prototype.pinstate.open;
			console.log(`gpio pin ${config.pin} set up and ready = ${this.gpiostate}`);
			
		});
GPIO.prototype.close = (() => {
		exec(`echo ${config.pin} > ${confing.gpiounexport}`)
			.then(((result) => {
				this.gpiostate = GPIO.prototype.pinstate.closed;
				console.log(`closing ${config.pin} in ${this}`);
			}))
			.catch((err) => {
				console.log("Error closing gpio pin: " + err);
			});
	});
GPIO.prototype.on = (() => {
		console.log(`called on in object ${this}`);
		if(!(this.gpiostate === GPIO.prototype.pinstate.open))
			this.open();
		exec(`echo 1 > ${config.gpioswitchvalue}`)
			.catch((err) => {
				console.log("Error turning on LED: " + err);
			});
		this.gpiostate = GPIO.prototype.pinstate.on;
	});
GPIO.prototype.onwithduration = ((duration, off) => {
		console.log(`called onwithduration in object ${this}`);
		this.on();
		setInterval(duration, off());
	});
GPIO.prototype.off = (() => {
		console.log(`called off in object ${this}`);
			exec(`echo 0 > ${config.gpioswitchvalue}`)
			.then(this.close())
			.catch((err) => {console.log("Error turning off LED: " + err);});
	});

module.exports = GPIO;
