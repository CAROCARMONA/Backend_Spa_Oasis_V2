'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "Mp(uI)@}Ec}@<x_*h-.~97<ZAig?cnwO";

function obtenerTokenUsuario(usuario){
    var payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        rol:   usuario.rol,
        iat: moment().unix(),
        exp: moment().add(100, 'minutes').unix()
    }
    return jwt.encode(payload, secret);
}


function validarTokenUsuario(req, res, next) {
    try {
        const tokenEnviadoPorUsuario = req.headers.authorization;
        if (!tokenEnviadoPorUsuario) {
            return res.status(401).send({ message: "Token de autenticación no proporcionado" });
        }

        const tokenLimpio = tokenEnviadoPorUsuario.replace("Bearer ", "");
        const payload = jwt.decode(tokenLimpio, secret);
        req.usuario = payload; // Agregar el payload decodificado al objeto req como req.usuario
        next();
    } catch (ex) {
        return res.status(403).send({ message: "Token inválido", details: ex.message });
    }
}

module.exports = {
    obtenerTokenUsuario,
    validarTokenUsuario
}
