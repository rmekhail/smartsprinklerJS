var forecast = require('./localweather');
var api = require('./api');
var ruleProvider = require('./ruleprovider');

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

