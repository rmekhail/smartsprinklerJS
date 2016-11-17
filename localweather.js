var location = require('./location.js');
var weather = require('./weather.js');

module.exports.localWeather = null;
module.exports.lastUpdated = null;

module.exports.debugRain = function ()
{
    
}

function processForecast (forecast)
{
    module.exports.localWeather = forecast;
    module.exports.lastUpdated = new Date();
    console.log ("Forecast updated on " + module.exports.lastUpdated);
    console.log ("It's " + forecast.main['temp'] + "F in " + forecast.name); 
}

function getLocalWeather()
{
    var city = '';

    if (city === '') {
        location(function (location) {
            if (!location) {
                console.log ('unable to retrieve location data');
                return;
            }
            
            city = location.city;
            weather(city).then(function(forecast) {
                processForecast(forecast);
            }, function(){
                console.log('Unable to retrieve the weather data.');
                return;
            });
        });
    } 
    else {
        weather(city).then(function(forecast) {
            processForecast (forecast);
        }, 
        function() {    
            console.log('Unable to retrieve the weather data.');
            return;
        });
    }
}

module.exports.getLocalWeather = getLocalWeather;

function startUpdates ()
{
    if (module.exports.localWeather == null)
    {
        getLocalWeather();
    }

    setInterval(updateWeather, 3600000);
}

module.exports.startUpdates = startUpdates;

function updateWeather () {
    console.log ("Weather Timer Triggered");
    getLocalWeather();
}