const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const productsFilePath = path.join(__dirname, '../dataBase/activos.json');
const usuariosFilePath = path.join(__dirname, '../dataBase/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        res.render("login");
    },    
    loginProcess: (req, res) => {
        let userToLogin = User.findByField("email", req.body.email);
        if(userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.pass);
            if(isOkThePassword){
                delete userToLogin.contrasena;
                req.session.userLogged = userToLogin;
                return res.redirect("/perfil")
            }
        }console.log(userToLogin.contrasena)
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

		usuarios.push(nuevoUsuario);
		fs.writeFileSync(usuariosFilePath,JSON.stringify(usuarios, null, " "),'utf-8');

		res.redirect('/login');
    }, 
    index: (req, res) => {
        res.render("index");
    }, 
    perfil: (req, res) => {
        return res.render("perfil", {
            user: req.session.userLogged
        });
    },
    administrador:(req, res) => {
        const activos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render("administrador",{activos: activos})
    },
};

module.exports = controller;