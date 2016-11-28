var exec = require("child-process-promise").exec;
var config = require("../config");

var GPIO = function() {
	this.ready = false;
	this.on = false;
}

GPIO.prototype.isready = function() {
		console.log(`returning ready: ${this.ready}`);
		return this.ready
};

GPIO.prototype.ison = function() {
		return this.on;
};

GPIO.prototype.open = function() {
		console.log(`opening gpio port ${config.pin}`);
		exec(`echo ${config.pin} > ${config.gpioexport}`)
			.then((result) => {
				console.log(`gpio pin ${config.pin} opened: ${result.stdout}`);
			})
			.catch((err) => {
				console.log("Error opening gpio pin: " + stderr);
			})
			.then(exec(`echo out > ${config.gpiodirection}`))
			.then((result) => {
				console.log(`gpio pin ${config.pin} set up`);
				this.ready = true;
			})
			.catch((err) => {
				console.log("Error initializing gpio pin: " + stderr);
			});
		return this.isready;
};

GPIO.prototype.close = function() {
		exec(`echo ${config.pin} > ${confing.gpiounexport}`)
			.catch((err) => {
				console.log("Error closing gpio pin: " + stderr);
			});
};
	
GPIO.prototype.on = function() {
		if(!this.ready)
			this.open();
		exec(`echo 1 > ${config.gpioswitchvalue}`)
			.then((result) => {
				this.on = true;
			})
			.catch((err) => {
				console.log("Error turning on LED: " + stderr);
			});
		return this.ison;
};

GPIO.prototype.onwithduration = function(duration, off) {
		this.on();
		setInterval(duration, off());
};
	
GPIO.prototype.off = function() {
	exec(`echo 0 > ${config.gpioswitchvalue}`)
		.then((result) => {
			this.on = false;
		})
		.then(this.close())
		.catch((err) => { console.log("Error turning off LED: " + stderr); });
};

module.exports = GPIO;