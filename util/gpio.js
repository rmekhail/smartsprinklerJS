var exec = require("child_process").exec;
var config = require("../config");

var openCmd = "echo 17 > /sys/class/gpio/export";
var exporturi = "/export";
var setupCmd = "echo out > /sys/class/gpio/gpio17/direction";
var onCmd = "echo 1 > /sys/class/gpio/gpio17/value";
var offCmd = "echo 0 > /sys/class/gpio/gpio17/value";
var closeCmd = "echo 17 > /sys/class/gpio/unexport"

var gpio = {
	opened : false,
	open : function() {
		exec("echo " + config.pin + " > " + config.gpiopath + exporturi, (err, stdout, stderr) => {
			if (err) {
				console.log("Error opening gpio pin: " + stderr);
			} else {
				this.opened = true;
			}
		});
		exec(setupCmd, (err, stdout, stderr) => {
			if(err) {
				console.log("Error initializing gpio pin: " + stderr);
			}
		});
	},
	
	close : function() {
		exec(closeCmd, (err, stdout, stderr) => {
			if(err) {
				console.log("Error closing gpio pin: " + stderr);
			}
		});
	},
	
	on : function() {
		if(!this.opened)
			this.open();
		exec(onCmd, (err, stdout, stderr) => {
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
			exec(offCmd, (err, stdout, stderr) => {
				if(err) {
					console.log("Error turning off LED: " + stderr);
				}
			});
			this.close();
		}
	}
}

module.exports = gpio;
