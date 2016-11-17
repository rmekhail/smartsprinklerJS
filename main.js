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

app.get('/sprinklers/on', (req,res) => {
    console.log ("Sprinklers On");
});

app.get('/sprinklers/off', (req,res) => {
    console.log ("Sprinklers Off");
});

app.post(/sprinklers/addrule, (req, res) => {
    console.log("Adding a rule");
    
})

var port = 8080;

app.listen(port, function(){
	console.log("Server running on port " + port);
});

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