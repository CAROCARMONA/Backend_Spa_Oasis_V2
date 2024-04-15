'use strict'

var Disponibilidad = require("../models/disponibilidad");

function crearDisponibilidad(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para crear disponibilidad horaria" });
    }

    var parametros = req.body;

    var nuevaDisponibilidad = new Disponibilidad({
        servicioId: parametros.servicioId,
        diaSemana: parametros.diaSemana,
        horaInicio: parametros.horaInicio,
        horaFin: parametros.horaFin
    });

    nuevaDisponibilidad.save().then(
        disponibilidadGuardada => {
            res.status(200).send({ disponibilidadCreada: disponibilidadGuardada });
        },
        err => {
            res.status(500).send({ message: "No se pudo crear la disponibilidad horaria. Intente nuevamente" });
        }
    );
}
function obtenerDisponibilidadPorServicio(req, res) {
    var servicioId = req.params.servicioId;

    Disponibilidad.find({ servicioId: servicioId })
        .then(disponibilidad => {
            res.status(200).send(disponibilidad);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener disponibilidad horaria por servicio", error: err });
        });
}
function actualizarDisponibilidad(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para actualizar disponibilidad horaria" });
    }

    var disponibilidadId = req.params.id;
    var parametros = req.body;

    Disponibilidad.findByIdAndUpdate(disponibilidadId, {
        diaSemana: parametros.diaSemana,
        horaInicio: parametros.horaInicio,
        horaFin: parametros.horaFin
    }, { new: true })
    .then(disponibilidadActualizada => {
        res.status(200).send(disponibilidadActualizada);
    })
    .catch(err => {
        res.status(500).send({ message: "Error al actualizar disponibilidad horaria", error: err });
    });
}
function eliminarDisponibilidad(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para eliminar disponibilidad horaria" });
    }

    var disponibilidadId = req.params.id;

    Disponibilidad.findByIdAndDelete(disponibilidadId)
    .then(() => {
        res.status(200).send({ message: "Disponibilidad horaria eliminada correctamente" });
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar disponibilidad horaria", error: err });
    });
}

module.exports = {
    crearDisponibilidad,
    obtenerDisponibilidadPorServicio,
    actualizarDisponibilidad,
    eliminarDisponibilidad
}
