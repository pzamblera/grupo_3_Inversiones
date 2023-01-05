const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require ("express-validator")
const axios = require("axios");
const ObtenerPelicula = require("../service/productosService")
// const User = require('../../models/User');

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
                delete userToLogin.clave;
                req.session.userLogged = userToLogin;
                //console.log(req.session.userLogged)
                return res.redirect("/")
            } 
        }/*console.log(userToLogin.clave)*/})

    },
    registro: (req, res) => {
        res.render("registro");
    }, 
    registro2: (req, res) => {
        const resultadoValidaciones = validationResult(req);
        console.log(resultadoValidaciones)

        if (resultadoValidaciones.isEmpty()){
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
            ), res.redirect('/perfil');

        } else { 
            res.render("registro", {
                errors: resultadoValidaciones.mapped(),
                oldData: req.body
        });
    }}, 
    index: (req, res) => {
        res.render("index");
    }, 
    perfil: (req, res) => { 
        let usuario = db.usuario.findByPk(req.session.userLogged.id_usuario)
        .then(function(usuario){
        res.render("perfil",{usuario:usuario})
    })
        
    //    return res.render("perfil", {
    //        user: req.session.userLogged
    //});
        
    },
    administrador:(req, res) => {
        db.inversion.findAll()
        .then(function(inversion){
        res.render("administrador",{inversion: inversion})}
        )
        //console.log(req.session.userLogged.email)
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect("/")
    },
    ingresar: (req, res) => {
        res.render("ingresar");
    },
    retirar: (req, res) => {
        res.render("retirar");
    },
    vistaInversion: function (req, res) {
        db.inversion.findAll()
        .then(function(inversion) {    
            res.render('invertir', {inversion:inversion})
            });
	},
    carrito: function (req, res) {
        db.inversion.findAll()
        .then(function(inversion) {    
            res.render('carrito', {inversion:inversion})
            });
	},  
    verCarrito: async function (req, res) {
        let historial = await db.historial_movimiento.findAll({include: [{association:"inversiones"}],
        
            where:{
                id_usuario: req.session.userLogged.id_usuario,
                Carrito: 1,
            }
        });
        let inversion = await db.inversion.findAll();
            console.log(historial)
            res.render('verCarrito', {historial_movimiento:historial, inversion:inversion})
            
            //console.log(inversion)
	}
    
};

module.exports = controller;