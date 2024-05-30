'use strict'

const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    reservaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservas' },
    monto: Number,
    fecha: Date,
    telefono:Number,
    metodo: { type: String, enum: ['Tarjeta', 'Transferencia', 'Pago en linea'] },
    estado: { type: String, enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' }
    
});

module.exports = mongoose.model('pagos', pagoSchema);