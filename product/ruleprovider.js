var gpio = require('../util/gpio');
var jsonfile = require('jsonfile');
var file = '/tmp/data.json';
var fs = require('fs');
var localweather = require('./localweather.js');


function ruleProvider() {
    this.delayed = false;
    this.delayDuration = 0;
    this.rules = [];
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

    ruleProvider.prototype.getrules = function() {
            // rules = json list
            if(this.rules.length == 0) {       
                fs.exists(file, (exists) => {
                    if(exists) { this.rules = jsonfile.readFileSync(file); }
                });  
                
            }
            return this.rules;
    };

    ruleProvider.prototype.apply = function() {
            this.getrules().forEach((rule) => {
                if (localweather.forecast != null){
                    if(!this.delayed) {
                        if(new Date() == rule.time){
                            if(localweather.forecast.rain['3h'] < rule.rainlevel) {
                                gpio.onwithduration(rule.duration*60000, gpio.off);
                            } else {
                                gpio.off();
                                delayed = true;
                                delayDuration = rule.delayDuration;
                            }

                        }
                        else if(localweather.forecast.rain['3h'] >= rule.rainlevel){
                            gpio.off();
                            delayed = true;
                            delayDuration = rule.delayDuration;
                        }
                    }
                }
            })
    };


module.exports = ruleProvider;
