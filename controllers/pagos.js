'use strict'
var Pagos = require('../models/pagos');

function crearPago(req, res) {
  
    var parametros = req.body;

    var nuevoPago = new Pagos({
        reservaId: parametros.reservaId,
        monto: parametros.monto,
        fecha: parametros.fecha,
        telefono: parametros.telefono,
        metodo: parametros.metodo,
        estado: parametros.estado
    });

    nuevoPago.save().then(
        (pagoGuardado) => {
            
            res.status(200).send({ pagoCreado: pagoGuardado, message: "Nos pondremos en contacto contigo para terminar el proceso de pago." });
        },
        err => {
            res.status(500).send({ message: "No se pudo crear el pago. Intente nuevamente" });
        }
    );
}
function obtenerTodosLosPagos(req, res) {
    
    Pagos.find({})
        .then(pagos => {
            res.status(200).send(pagos);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener los pagos", error: err });
        });
}
function obtenerPagoPorId(req, res) {
    var pagoId = req.params.id;

    Pagos.findById(pagoId)
        .then(pago => {
            if (!pago) {
                return res.status(404).send({ message: "Pago no encontrado" });
            }
            res.status(200).send(pago);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener el pago", error: err });
        });
}
function actualizarPago(req, res) {


    var pagoId = req.params.id;
    var nuevosDatos = req.body;

    Pagos.findByIdAndUpdate(pagoId, nuevosDatos, { new: true })
        .then(pagoActualizado => {
            if (!pagoActualizado) {
                return res.status(404).send({ message: "Pago no encontrado" });
            }
            res.status(200).send(pagoActualizado);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar el pago", error: err });
        });
}
function eliminarPago(req, res) {
    if (req.usuario.rol !== "Administrador") {
        return res.status(403).send({ message: "No tiene permisos para crear pagos" });
    }
    var pagoId = req.params.id;

    Pagos.findByIdAndDelete(pagoId)
        .then(() => {
            res.status(200).send({ message: "Pago eliminado correctamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar el pago", error: err });
        });
}
module.exports = {
   crearPago,
   obtenerPagoPorId,
   obtenerTodosLosPagos,
   eliminarPago,
   actualizarPago
 }