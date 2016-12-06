var jsonfile = require('jsonfile');
var config = require('../config');
var file = config.rulefile;//'/tmp/data.json';
var fs = require('fs');
var localweather = require('./localweather.js');


function ruleProvider(pins) {
    this.gpio = pins;
    this.delayed = false;
    this.delayDuration = 0;
    this.rainlevel = 0;
    this.forecast = null;
    this.rules = [];
}

ruleProvider.prototype.getgpio = function(){
    return this.gpio;
}

ruleProvider.prototype.addrule = function(rule) {
    console.log("Adding new rule, for sprinklers to turn on at " + rule.time + " for " + rule.duration + " minutes.");
    this.rules.push(rule);
    console.log("adding rules:\n" + JSON.stringify(this.rules));
    fs.truncate(file, 0, () => 
        jsonfile.writeFile(file, rule, (err) => {
                                        if(err) console.log("Error storing the rule: " + err)
                                    }));
            
};

ruleProvider.prototype.getgpio = function() {
    return this.gpio;
}

ruleProvider.prototype.getrules = function() {
    // rules = json list
    if(this.rules.length == 0) {       
        fs.exists(file, (exists) => {
            if(exists) {
                this.rules = jsonfile.readFileSync(file); 
            }
        });                
    }
    return this.rules;
};

ruleProvider.prototype.apply = function() {
    this.rules.forEach((rule) => {
        if (this.getforecast() != null){
            if(!this.delayed) {
                var currentTime = new Date();
                console.log(`Value for rule.time is ${rule.time}`);
                if((currentTime.getHours() == rule.time.getHours()) && 
                        (currentTime.getMinutes() == rule.time.getMinutes())){
                    if(this.getforecast().rainlevel < rule.rainlevel) {
                        console.log(`Detecting rain ${this.getforecast().rainlevel} is below threshold of ${rule.rainlevel}`);
                        this.gpio.onwithduration(rule.duration*60000, this.gpio.off);
                    } else {
                        console.log(`Detecting rain ${this.getforecast().rainlevel} >= threshold of ${rule.rainlevel}`);
                        this.gpio.off();
                        delayed = true;
                        delayDuration = rule.duration;
                    }
                } else if(this.getforecast().rainlevel >= rule.rainlevel){
                    console.log(`Detecting rain ${this.getforecast().rainlevel} >= threshold of ${rule.rainlevel}`);
                    this.gpio.off();
                    delayed = true;
                    delayDuration = rule.duration;
                }
            }
        }
    });
};

ruleProvider.prototype.getforecast = function(){
    return this.forecast;
}

ruleProvider.prototype.setforecast = function(fc){
    this.forecast = fc;
}

ruleProvider.prototype.isdelayed = function() {
    return this.delayed;
};

ruleProvider.prototype.getdelayduration = function(){
    return this.delayDuration;
}



module.exports = ruleProvider;
