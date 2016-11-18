var gpio = require('../util/hack-gpio');
var express = require('express');
var bp = require('body-parser');

module.exports.startServer = function (ruleProvider) {
    
    var app = express();    
    app.use(bp.json());

    app.get('/rules', function(req, res){
	    res.json(ruleProvider.getrules());
    });

    app.post('/rules/add', (req,res) => {
        console.log ("Add Rule");
        ruleProvider.addrule(req.body);
    });

    app.post('/rules/delete', (req,res) => {
        console.log ("Delete Rule");
    });

    app.put('/sprinklers/on', (req,res) => {
        console.log ("Sprinklers: ON");
        gpio.on();
        res.json({});
    });

    app.put('/debug/rain', (req, res) => {
        res.json({});
    });

    app.put('/sprinklers/off', (req,res) => {
        console.log ("Sprinklers: OFF");
        gpio.off();
        res.json({});    
    });
    
    var port = 8080;

    app.listen(port, function(){
	    console.log("Server running on port " + port);
    });
}