var gpio = require('./hack-gpio');
var forecast = require('./localweather');
var api = require('./api');
var ruleProvider = require('./ruleprovider');

var provider = new ruleProvider();
api.startServer(provider);
forecast.startUpdates();

//==================TIMERS======================END

function sprinklerTimer() {
    console.log ("Sprinkler Timer Triggered");

    provider.apply();
}


setInterval(sprinklerTimer, 5000);

