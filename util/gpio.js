var exec = require("child_process").exec;
var config = require("../config");

var exporturi = "/export";
var directionuri = "/direction";
var valueuri = "/value";
var unexporturi = "/unexport";

var gpio = {
	opened : false,
	open : function() {
		exec(`echo ${config.pin} > ${config.gpiopath}${exporturi}`, (err, stdout, stderr) => {
			if (err) {
				console.log("Error opening gpio pin: " + stderr);
			} else {
				this.opened = true;
			}
		});
		exec(`echo out > ${config.gpiopath}/gpio${config.pin}${directionuri}`, (err, stdout, stderr) => {
			if(err) {
				console.log("Error initializing gpio pin: " + stderr);
			}
		});
	},
	
	close : function() {
		exec(`echo ${config.pin} > ${config.gpiopath}${unexporturi}`, (err, stdout, stderr) => {
			if(err) {
				console.log("Error closing gpio pin: " + stderr);
			}
		});
	},
	
	on : function() {
		if(!this.opened)
			this.open();
		exec(`echo 1 > ${config.gpiopath}/gpio${config.pin}${valueuri}`, (err, stdout, stderr) => {
			if(err) {
				console.log("Error turning on LED: " + stderr);
			}
		});
	},
	onwithduration : function(duration, off) {
		this.on();
		setInterval(duration, off());
	},
	
	off : function() {
		 {
			exec(`echo 0 > ${config.gpiopath}/gpio${config.pin}${valueuri}`, (err, stdout, stderr) => {
				if(err) {
					console.log("Error turning off LED: " + stderr);
				}
			});
			this.close();
		}
	}
}

module.exports = gpio;
