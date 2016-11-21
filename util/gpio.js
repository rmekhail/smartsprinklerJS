var exec = require("child-process-promise").exec;
var config = require("../config");

var gpio = {
	ready: false,
	isready : () => {
		console.log(`returning ready: ${this.ready}`);
		return this.ready
	},
	open : function() {
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
	},
	close : function() {
		exec(`echo ${config.pin} > ${confing.gpiounexport}`)
			.catch((err) => {
				console.log("Error closing gpio pin: " + stderr);
			});
	},
	
	on : function() {
		if(!this.ready)
			this.open();
		exec(`echo 1 > ${config.gpioswitchvalue}`)
			.catch((err) => {
				console.log("Error turning on LED: " + stderr);
			});
	},
	onwithduration : function(duration, off) {
		this.on();
		setInterval(duration, off());
	},
	
	off : function() {
		 {
			exec(`echo 0 > ${config.gpioswitchvalue}`)
			.then(this.close())
			.catch((err) => {console.log("Error turning off LED: " + stderr);});
		}
	}
}

module.exports = gpio;
