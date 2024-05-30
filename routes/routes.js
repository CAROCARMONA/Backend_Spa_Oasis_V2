'use strict'

var express = require('express');
var authController = require('../controllers/autenticacion');
var servicioController =require('../controllers/servicios');
var disponibilidadController =require('../controllers/disponibilidad');
var reservaController=require('../controllers/reservas');
var pagoController =require('../controllers/pagos');
var token = require('../helpers/autenticacion');
var routes = express.Router();


// Funciones para la gestión de servicios
routes.post('/api/servicio/crear', token.validarTokenUsuario, servicioController.crearServicio);
routes.put('/api/servicio/actualizar/:id', token.validarTokenUsuario, servicioController.actualizarServicio);
routes.delete('/api/servicio/borrar/:id', token.validarTokenUsuario, servicioController.borrarServicio);
routes.get('/api/servicio/buscarPorClasificacion/:clasificacion',  servicioController.buscarServiciosPorClasificacion);


// Funciones para la gestión de disponibilidad horaria
routes.post('/api/disponibilidad/crear', token.validarTokenUsuario, disponibilidadController.crearDisponibilidad);
routes.put('/api/disponibilidad/actualizar/:id', token.validarTokenUsuario, disponibilidadController.actualizarDisponibilidad);
routes.delete('/api/disponibilidad/eliminar/:id', token.validarTokenUsuario, disponibilidadController.eliminarDisponibilidad);
routes.get('/api/disponibilidad/obtenerPorId/:id',token.validarTokenUsuario, disponibilidadController.obtenerDisponibilidadPorId);
routes.get('/api/disponibilidad/obtenerPorServicio/:servicioId', disponibilidadController.obtenerDisponibilidadPorServicio);


// Funciones para la gestión de reservas
routes.post('/api/reserva/crear', token.validarTokenUsuario, reservaController.crearReserva);
routes.get('/api/reserva/obtenerTodas', token.validarTokenUsuario, reservaController.obtenerTodasLasReservas);
routes.get('/api/reserva/obtenerPorId/:id', token.validarTokenUsuario, reservaController.obtenerReservaPorId);
routes.get('/api/reserva/obtenerPorUsuario/:id', token.validarTokenUsuario, reservaController.obtenerReservaPorIdUsuario);
routes.put('/api/reserva/actualizar/:id', token.validarTokenUsuario, reservaController.actualizarReserva);
routes.delete('/api/reserva/eliminar/:id', token.validarTokenUsuario, reservaController.eliminarReserva);

// Rutas para la gestión de pagos
routes.post('/api/pagos/crear', token.validarTokenUsuario, pagoController.crearPago);
routes.get('/api/pagos/obtenerTodos', token.validarTokenUsuario, pagoController.obtenerTodosLosPagos);
routes.get('/api/pagos/obtenerPorId/:id', token.validarTokenUsuario, pagoController.obtenerPagoPorId);
routes.put('/api/pagos/actualizar/:id', token.validarTokenUsuario, pagoController.actualizarPago);
routes.delete('/api/pagos/eliminar/:id', token.validarTokenUsuario, pagoController.eliminarPago);

routes.post('/api/usuario/crear', authController.registrarUsuario);
routes.post('/api/usuario/iniciarsesion', authController.iniciarSesion);

module.exports = routes;
