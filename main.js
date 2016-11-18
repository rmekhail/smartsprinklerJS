var forecast = require('./product/localweather');
var api = require('./product/api');
var ruleProvider = require('./product/ruleprovider');

var provider = new ruleProvider();
api.startServer(provider);
forecast.startUpdates();

//==================TIMERS======================END

function sprinklerTimer() {
    console.log ("Sprinkler Timer Triggered");
    console.log ("Forecast last updated: " + forecast.lastUpdated)
    provider.apply();
}


setInterval(sprinklerTimer, 5000);

