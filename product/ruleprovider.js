var jsonfile = require('jsonfile');
var config = require('../config');
var file = config.rulefile;//'/tmp/data.json';
var fs = require('fs');
var localweather = require('./localweather.js');


function RuleProvider(pins) {
    this.gpio = pins;
    this.delayed = false;
    this.delayDuration = 0;
    this.rainLevel = 0;
    this.forecast = null;
    this.rules = [];
}

RuleProvider.prototype.getGpio = function(){
    return this.gpio;
}

RuleProvider.prototype.addRule = function(rule) {
    console.log(`Adding new rule, for sprinklers to turn on at ${rule.time} for`
                +` ${rule.duration} minutes.`);
    this.rules.push(rule);
    console.log('adding rules:\n' + JSON.stringify(this.rules));
    fs.truncate(file, 0, () => 
        jsonfile.writeFile(file, rule, (err) => {
                                        if(err) {
                                            console.log(`Error storing the rule: ${err}`);
                                        }
                                    }));
            
};

RuleProvider.prototype.getGpio = function() {
    return this.gpio;
}

RuleProvider.prototype.getRules = function() {
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

RuleProvider.prototype.apply = function() {
    this.rules.forEach((rule) => {
        if (this.getForecast() != null){
            if(!this.delayed) {
                var currentTime = new Date();
                console.log(`Value for rule.time is ${rule.time}`);
                if((currentTime.getHours() == rule.time.getHours()) && 
                        (currentTime.getMinutes() == rule.time.getMinutes())){
                    if(this.getForecast().rainLevel < rule.rainLevel) {
                        console.log(`Detecting rain ${this.getForecast().rainLevel} is below threshold of ${rule.rainLevel}`);
                        this.gpio.onwithduration(rule.duration*60000, this.gpio.off);
                    } else {
                        console.log(`Detecting rain ${this.getForecast().rainLevel} >= threshold of ${rule.rainLevel}`);
                        this.gpio.off();
                        delayed = true;
                        delayDuration = rule.duration;
                    }
                } else if(this.getForecast().rainLevel >= rule.rainLevel){
                    console.log(`Detecting rain ${this.getForecast().rainLevel} >= threshold of ${rule.rainLevel}`);
                    this.gpio.off();
                    delayed = true;
                    delayDuration = rule.duration;
                }
            }
        }
    });
};

RuleProvider.prototype.getForecast = function(){
    return this.forecast;
}

RuleProvider.prototype.setForecast = function(fc){
    this.forecast = fc;
}

RuleProvider.prototype.isDelayed = function() {
    return this.delayed;
};

RuleProvider.prototype.getDelayDuration = function(){
    return this.delayDuration;
}



module.exports = RuleProvider;
