'use strict'

const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    reservaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservas' },
    monto: Number,
    fecha: Date,
    metodo: { type: String, enum: ['Tarjeta', 'Transferencia', 'Efectivo'] },
    estado: { type: String, enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' }
    
});

module.exports = mongoose.model('pagos', pagoSchema);