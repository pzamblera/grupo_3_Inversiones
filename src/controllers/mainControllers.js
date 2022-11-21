const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
/*const User = require('../../models/User');*/

/*const productsFilePath = path.join(__dirname, '../dataBase/activos.json');
const usuariosFilePath = path.join(__dirname, '../dataBase/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));*/

const db=require("../dataBase/models")

const controller = {
    login: (req, res) => {
        res.render("login");
    },    
    loginProcess: (req, res) => {
        db.usuario.findOne({where: {email:req.body.email}}).then(function(userToLogin){
        if(userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.clave);
            if(isOkThePassword){
                delete userToLogin.clavea;
                req.session.userLogged = userToLogin;
                return res.redirect("/perfil")
            }
        }console.log(userToLogin.clave)})

    },
    registro: (req, res) => {
        res.render("registro");
    }, 
    registro2: (req, res) => {
        let datos = req.body;
        let cEncriptada = bcrypt.hashSync(datos.contrasena,10);

        db.usuario.create(
            {
                nombre: datos.nombre,
                apellido: datos.apellido,
                email: datos.email,
                clave: cEncriptada,
                avatar: req.file.filename,
                monto_billetera: 0,
                administrador: 0
            }
            )

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
        db.inversion.findAll()
        .then(function(inversion){
        res.render("administrador",{inversion: inversion})}
        )
    },
};

module.exports = controller;