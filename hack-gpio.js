var exec = require("child_process").exec;

var openCmd = "echo 17 > /sys/class/gpio/export";
var setupCmd = "echo out > /sys/class/gpio/gpio17/direction";
var onCmd = "echo 1 > /sys/class/gpio/gpio17/value";
var offCmd = "echo 0 > /sys/class/gpio/gpio17/value";
var closeCmd = "echo 17 > /sys/class/gpio/unexport"

var gpio = {
	opened : false,
	open : function() {
		exec(openCmd, (err, stdout, stderr) => {
			if (err) {
				console.log("Error opening gpio pin: " + stderr);
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
	
	on : function(duration, off) {
		if(!opened)
			open();
		exec(onCmd, (err, stdout, stderr) => {
			if(err) {
				console.log("Error turning on LED: " + stderr);
			}
		});
		setInterval(duration, off());
	},
	
	off : function() {
		if(opened) {
			exec(offCmd, (err, stdout, stderr) => {
				if(err) {
					console.log("Error turning off LED: " + stderr);
				}
			});
			close();
		}
	}
}

module.exports = gpio;
