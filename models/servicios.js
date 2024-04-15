'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var servicioSchema = Schema({
    titulo: String,
    descripcion: String,
    clasificacion:String,
    precio: Number,
    duracion: String

});

module.exports = mongoose.model('servicios', servicioSchema);