'use strict'

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors"); // Importar cors
var routes = require("./routes/routes");

var application = express();

application.use(cors()); // Usar cors antes de las rutas
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());
application.use(routes);

module.exports = application;
