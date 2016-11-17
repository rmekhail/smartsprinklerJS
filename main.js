var forecast = require('./localweather');
var api = require('./api')

api.startServer();
forecast.startUpdates();

//==================SAVE=======================
//var jsonfile = require('jsonfile');
//var file = '/tmp/data.json';
 
//jsonfile.writeFileSync(file, obj)

//==================TIMERS======================END

function sprinklerTimer() {
    console.log ("Sprinkler Timer Triggered");
    console.log ("%j",forecast.localWeather)
    console.log ("Forecast last updated: " + forecast.lastUpdated)
    //jsonfile.readFile(file, (err, obj) => {
    //    console.dir(obj);
    //})
}

//jsonfile.writeFileSync(file, data);

setInterval(sprinklerTimer, 5000);

