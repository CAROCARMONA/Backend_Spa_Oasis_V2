'use strict'
const mongoose = require('mongoose');

const disponibilidadSchema = new mongoose.Schema({
    servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'servicios' },
    diaSemana: String,
    horaInicio: String,
    horaFin: String
});

module.exports = mongoose.model('disponibilidades', disponibilidadSchema);