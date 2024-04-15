'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/MySpa').then(
    () => {
        console.log("Conexion exitosa con la BBDD. Iniciando aplicacion");
        application.listen(8552, function(){
            console.log("La aplicacion web se ha iniciado correctamente");
        });
    },
    err => {    
        console.log("Conexion fallida con la BBDD. Aplicacion no iniciada");
    }
);
