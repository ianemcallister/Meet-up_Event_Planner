//load modules
var express = require('express');
var app = express();

//controllers
//var htmlController = require('./controllers/htmlController');

//environment cariables
var port = process.PORT || 3005;

//connecting middleware
app.set('/assets', express.static(__dirname + '/dist'));

//setup templates

//setting up middleware

//call html controller

//call api controller

//open the port for local development
console.log('starting the server');
app.listen(port);