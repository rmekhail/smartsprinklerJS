var express = require('express');
var bp = require('body-parser');
var gpio = require('./hack-gpio');

var app = express();
app.use(bp.json());

var data = [{country: 'U.S.A.', helloTxt: 'hello', flag: '🇺🇸'},
            {country: 'France', helloTxt: 'bonjour', flag: '🇫🇷'},
            {country: 'Great Britain', helloTxt: 'ello', flag: '🇬🇧'},
            {country: 'Spain', helloTxt: 'hola', flag: '🇪🇸'}];

app.get('/rules', function(req, res){
	res.json(data);
});

app.post('/rules/add', (req,res) => {
    console.log ("Add Rule");
});

app.post('/rules/delete', (req,res) => {
    console.log ("Delete Rule");
});

app.put('/sprinklers/on', (req,res) => {
    console.log ("Sprinklers ON");
    gpio.open();
    gpio.on();
    res.json({});
});

app.put('/sprinklers/off', (req,res) => {
    console.log ("Sprinklers OFF");
    gpio.off();
    gpio.close();
    res.json({});    
});

var port = 8080;

app.listen(port, function(){
	console.log("Server running on port " + port);
});

//================WEATHER======================
var location = require('./location.js');
var weather = require('./weather.js');
var localWeather;

function getLocalWeather ()
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
            weather(city).then(function(temp) {
                console.log ("It's " + temp + "F in " + city);
                localWeather = temp
            }, function(){
                console.log('Unable to retrieve the weather data.');
                return;
            });
        });
    } 
    else {
        weather(city).then(function(temp) {
        console.log ("It's " + "%j" + "F in " + city, temp);
        }, 
        function() {    
            console.log('Unable to retrieve the weather data.');
            return;
        });
    }
}
getLocalWeather();

//================WEATHER======================

//==================SAVE=======================
var jsonfile = require('jsonfile');
var file = '/tmp/data.json';
 
//jsonfile.writeFileSync(file, obj)

//==================TIMERS======================

function sprinklerTimer() {
    console.log ("Sprinkler Timer Triggered");

    jsonfile.readFile(file, (err, obj) => {
        console.dir(obj);
    })
}

jsonfile.writeFileSync(file, data);

setInterval(sprinklerTimer, 5000);

function updateWeather () {
    console.log ("Weather Timer Triggered");
}

setInterval(updateWeather, 3600000);