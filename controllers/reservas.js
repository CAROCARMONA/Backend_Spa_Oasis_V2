'use strict'

var Reserva = require('../models/reservas');

function crearReserva(req, res) {
    var parametros = req.body;

    var nuevaReserva = new Reserva({
        
        servicioId: parametros.servicioId,
        usuarioId: parametros.usuarioId,
        disponibilidadId:parametros.disponibilidadId,
        nombreUsuario:parametros.nombreUsuario,
        nombreServicio:parametros.nombreServicio,
        fecha: parametros.fecha,
        estado: parametros.estado
    });

    nuevaReserva.save().then(
        (reservaGuardada) => {
            
            res.status(200).send({ reservaCreada: reservaGuardada, message: "¡Reserva creada exitosamente!" });
            
            
        },
        err => {
            res.status(500).send({ message: "No se pudo crear la reserva. Intente nuevamente" });
        }
    );
}
function obtenerTodasLasReservas(req, res) {
    Reserva.find({})
        .then(reservas => {
            res.status(200).send(reservas);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener las reservas", error: err });
        });
}
function obtenerReservaPorId(req, res) {
    var reservaId = req.params.id;

    Reserva.findById(reservaId)
        .then(reserva => {
            if (!reserva) {
                return res.status(404).send({ message: "Reserva no encontrada" });
            }
            res.status(200).send(reserva);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener la reserva", error: err });
        });
}

function obtenerReservaPorIdUsuario(req, res) {
    const usuarioId = req.params.id;

    Reserva.find({ usuarioId })
        .then(reservas => {
            if (!reservas.length) {
                return res.status(404).send({ message: "No se encontraron reservas para este usuario" });
            }
            res.status(200).send(reservas);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener las reservas", error: err });
        });
}






function actualizarReserva(req, res) {
    var reservaId = req.params.id;
    var nuevosDatos = req.body;

    Reserva.findByIdAndUpdate(reservaId, nuevosDatos, { new: true })
        .then(reservaActualizada => {
            if (!reservaActualizada) {
                return res.status(404).send({ message: "Reserva no encontrada" });
            }
            res.status(200).send(reservaActualizada);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar la reserva", error: err });
        });
}
function eliminarReserva(req, res) {
    var reservaId = req.params.id;

    Reserva.findByIdAndDelete(reservaId)
        .then(() => {
            res.status(200).send({ message: "Reserva eliminada correctamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar la reserva", error: err });
        });
}
module.exports = {
   crearReserva,
   eliminarReserva,
   obtenerTodasLasReservas,
   obtenerReservaPorId,
   obtenerReservaPorIdUsuario,
   actualizarReserva
}
