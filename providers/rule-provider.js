var rule = require('../rule.js');
var gpio = require('../hack-gpio.js');

var ruleProvider = {
    delayed : false,
    delayDuration : 0,
    addrule : function(temp, duration, rain, repeat) {
        rule.temp = temp;
        rule.duration = duration;
        rule.rainlevel = rain;
        rule.repeat = repeat;
        // TODO: persist rule here
    },
    apply : function() {
        getrules.forEach((rule) => {
            if(!delayed) {
                if(time == rule.time){
                    if(rain < rule.rainlevel) {
                        gpio.on(rule.duration*60000, gpio.off);
                    } else {
                        gpio.off();
                        delayed = true;
                        delayDuration = rule.delayDuration;
                    }

                }
                else if(rain >= rule.rainlevel){
                    gpio.off();
                    delayed = true;
                    delayDuration = rule.delayDuration;
                }
            }
        })
    },
    getrules : function() {
        // rules = json list
    }

}

module.export.ruleProvider = ruleProvider;
