'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    rol: String,
    password: String
});

module.exports = mongoose.model('usuarios', UsuarioSchema);
