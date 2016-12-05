var exec = require("child-process-promise").exec;
var config = require("../config");
"use strict"
var GPIO = function(){
	this.ready = false;
	
}

GPIO.prototype.isready = (() => {
		console.log(`returning ready: ${this.ready} from this ${this}`);
		return this.ready;
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
			this.ready = true;
			console.log(`gpio pin ${config.pin} set up and ready = ${this.ready}`);
			
		});
GPIO.prototype.close = (() => {
		exec(`echo ${config.pin} > ${confing.gpiounexport}`)
			.then(((result) => {
				this.ready = false;
				console.log(`closing ${config.pin} in ${this}`);
			}))
			.catch((err) => {
				console.log("Error closing gpio pin: " + err);
			});
	});
GPIO.prototype.on = (() => {
		console.log(`called on in object ${this}`);
		if(!this.ready)
			this.open();
		exec(`echo 1 > ${config.gpioswitchvalue}`)
			.catch((err) => {
				console.log("Error turning on LED: " + err);
			});
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
