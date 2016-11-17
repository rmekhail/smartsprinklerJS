//================WEATHER======================END
var location = require('./location.js');
var weather = require('./weather.js');

module.exports.localWeather = null;
module.exports.lastUpdated = null;

function getLocalWeather()
{
    var city = '';

    // parse command line for location here
    if (city === '') {
        location(function (location) {
            if (!location) {
                console.log ('unable to retrieve location data');
                return;
            }
            
            city = location.city;
            weather(city).then(function(forecast) {
                console.log ("It's " + forecast.main['temp'] + "F in " + city);
                module.exports.localWeather = forecast;
                module.exports.lastUpdated = new Date(); 
            }, function(){
                console.log('Unable to retrieve the weather data.');
                return;
            });
        });
    } 
    else {
        weather(city).then(function(forecast) {
        console.log ("It's " + forecast.main['temp'] + "F in " + city);
        module.exports.localWeather = forecast;
        module.exports.lastUpdated = new Date();
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

//================WEATHER======================END