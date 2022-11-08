const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {body, check, validationResult} = require("express-validator");

const usuariosFilePath = path.join(__dirname, '../dataBase/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        res.render("login");
    },
    processLogin: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
           
        } else {
            return res.render("login", {errors: errors.errors})
        }

    },
    registro: (req, res) => {
        res.render("registro");
    }, 
    registro2: (req, res) => {
        let datos = req.body;
		let idNuevoUsuario = (usuarios[usuarios.length-1].idUsuario)+1;
        let cEncriptada = bcrypt.hashSync(datos.contrasena,10);
		let nuevoUsuario ={
			"idUsuario": idNuevoUsuario,
			"nombre": datos.nombre,
            "apellido": datos.apellido,
			"email": datos.email,
            "monto": 0,
            "pass": cEncriptada,
            "avatar": req.file.filename
		};
        console.log(idNuevoUsuario);
        console.log();
        console.log();

		usuarios.push(nuevoUsuario);
		fs.writeFileSync(usuariosFilePath,JSON.stringify(usuarios, null, " "),'utf-8');

		res.redirect('/login');
    }, 
    index: (req, res) => {
        res.render("index");
    }, 
    perfil: (req, res) => {
        res.render("perfil");
    },
    administrador:(req, res) => {
        const activos = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
        res.render("administrador",{activos: activos})
    },
};

module.exports = controller;