'use strict'

var Servicio = require("../models/servicios");

function crearServicio(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para crear servicios" });
    }

    var parametros = req.body;

    var nuevoServicio = new Servicio({
        titulo: parametros.titulo,
        descripcion: parametros.descripcion,
        clasificacion:parametros.clasificacion,
        precio: parametros.precio,
        duracion: parametros.duracion
    });

    nuevoServicio.save().then(
        (servicioGuardado) => {
            res.status(200).send({ servicioCreado: servicioGuardado });
        },
        err => {
            res.status(500).send({ message: "No se pudo crear el servicio. Intente nuevamente" });
        }
    );
}

function actualizarServicio(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para actualizar servicios" });
    }

    var servicioId = req.params.id;
    var parametros = req.body;

    Servicio.findByIdAndUpdate(servicioId, {
        titulo: parametros.titulo,
        descripcion: parametros.descripcion,
        precio: parametros.precio,
        duracion: parametros.duracion

    }, { new: true })
    .then(servicioActualizado => {
        if (!servicioActualizado) {
            return res.status(404).send({ message: "No se encontró el servicio" });
        }
        res.status(200).send({ servicioActualizado });
    })
    .catch(err => {
        res.status(500).send({ message: "Error al actualizar el servicio" });
    });
}
function borrarServicio(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para eliminar servicios" });
    }

    var servicioId = req.params.id;

    Servicio.findByIdAndDelete(servicioId)
    .then(servicioEliminado => {
        if (!servicioEliminado) {
            return res.status(404).send({ message: "No se encontró el servicio" });
        }
        res.status(200).send({ message: "Servicio eliminado correctamente" });
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar el servicio" });
    });
}

function buscarServiciosPorClasificacion(req, res) {
    var clasificacion = req.params.clasificacion;

    Servicio.find({ clasificacion: clasificacion })
        .then(serviciosEncontrados => {
            res.status(200).send(serviciosEncontrados);
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo consultar los servicios por clasificación. Intente nuevamente" });
        });
}


module.exports = {
    crearServicio,
    actualizarServicio,
    borrarServicio,
    buscarServiciosPorClasificacion
}

