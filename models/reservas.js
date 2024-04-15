'use strict'

const mongoose = require('mongoose');

const reservasSchema = new mongoose.Schema({
    servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'servicios' },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
    fecha: Date,
    estado: { type: String, enum: ['Pendiente', 'Confirmada', 'Cancelada'], default: 'Pendiente' }
});

module.exports = mongoose.model('reservas', reservasSchema);