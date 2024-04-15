'use strict'

var Usuario = require('../models/usuarios');
var token = require('../helpers/autenticacion');
var bcrypt = require('bcryptjs');


function registrarUsuario(req, resp){
    
    var parametros = req.body;

    var salt = bcrypt.genSaltSync(15);
    var contrasenaEncriptada = bcrypt.hashSync(parametros.password, salt);

    var nuevoUsuario = new Usuario();
    nuevoUsuario.nombre = parametros.nombre;
    nuevoUsuario.apellidos = parametros.apellidos;
    nuevoUsuario.email = parametros.email;
    nuevoUsuario.rol=parametros.rol;
    nuevoUsuario.password = contrasenaEncriptada;

    nuevoUsuario.save().then(
        (usuarioGuardado) => {
            resp.status(200).send({usuarioCreado: usuarioGuardado});
        },
        err => {
            resp.status(500).send({message:"No se pudo crear el usuario. Intente nuevamente"});
        }
    );

}

function iniciarSesion(req, resp){
    var parametros = req.body;

    var emailIngresado = parametros.email;
    var passwordIngresado = parametros.password;

    Usuario.findOne({email:emailIngresado}).then(
        (usuarioEncontrado) => {
            if(usuarioEncontrado == null){
                resp.status(403).send({message:"No existe usuario"})
            }
            else{
                // Verificar el rol del usuario
                if(usuarioEncontrado.rol === "Administrador"){
                    // Iniciar sesión para el rol de administrador
                    if(bcrypt.compareSync(passwordIngresado, usuarioEncontrado.password)){
                        resp.status(200).send({message:"Usuario administrador logueado", token: token.obtenerTokenUsuario(usuarioEncontrado)})
                    }
                    else{
                        resp.status(403).send({message:"Contraseña no válida para administrador"});
                    }
                }
                else if(usuarioEncontrado.rol === "Usuario"){
                    // Iniciar sesión para el rol de usuario básico
                    if(bcrypt.compareSync(passwordIngresado, usuarioEncontrado.password)){
                        resp.status(200).send({message:"Usuario logueado", token: token.obtenerTokenUsuario(usuarioEncontrado)})
                    }
                    else{
                        resp.status(403).send({message:"Contraseña no válida para usuario"});
                    }
                }
                else{
                    resp.status(403).send({message:"Rol no reconocido"});
                }
            }
        },
        err=>{
            resp.status(500).send({message: "No se pudo validar las credenciales, intente de nuevo"});
        }
    );
}

module.exports = {
    registrarUsuario, iniciarSesion
}
