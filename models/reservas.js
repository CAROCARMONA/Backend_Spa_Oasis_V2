'use strict'

const mongoose = require('mongoose');
const disponibilidad = require('./disponibilidad');

const reservasSchema = new mongoose.Schema({
    
    servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'servicios' },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
    disponibilidadId: { type: mongoose.Schema.Types.ObjectId, ref: 'disponibilidades' },
    nombreUsuario: String,
    nombreServicio: String,
    fecha: Date,
    
    estado: { type: String, enum: ['Pendiente', 'Confirmada', 'Cancelada'], default: 'Pendiente' }
});

module.exports = mongoose.model('reservas', reservasSchema);