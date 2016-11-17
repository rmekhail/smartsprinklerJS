var express = require('express');
var bp = require('body-parser');

module.exports.startServer = function () {
    
    var app = express();    
    app.use(bp.json());

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
        console.log ("Sprinklers: ON");
        gpio.open();
        gpio.on();
        res.json({});
    });

    app.put('/sprinklers/off', (req,res) => {
        console.log ("Sprinklers: OFF");
        gpio.off();
        gpio.close();
        res.json({});    
    });
    
    var port = 8080;

    app.listen(port, function(){
	    console.log("Server running on port " + port);
    });
}