const { promiseImpl } = require('ejs');
const fs = require('fs');
const path = require('path');
const { domainToUnicode } = require('url');

//const { validationResult } = require('express-validator');
// const productsFilePath = path.join(__dirname, '../dataBase/activos.json');
// const activos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db=require("../dataBase/models")

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller2 = {
    producto: function (req, res) {
        db.inversion.findAll().then(function(inversion) {    
        res.render("producto"), {inversion:inversion}
        })  
    
    },

    //crear
    crear1: function (req, res) {
        db.riesgo.findAll()
        .then(function(riesgo) {    
            res.render('crear', {riesgo:riesgo})
            });
	},      

    crear2: (req, res) => {
        let datos = req.body;
        let iconNSP = "";
        if(datos.id_riesgo == 1){
            iconNSP = "fa-group-arrows-rotate";
        }
        if(datos.id_riesgo == 2){
            iconNSP = "fa-seedling";
        }
        if(datos.id_riesgo == 3){
            iconNSP = "fa-coins";
        };
        
        db.inversion.create(
		{
			nombre_inversion: datos.nombre_inversion,
            id_riesgo: datos.id_riesgo,
			descripcion: datos.descripcion,
            icono: iconNSP,
		}
        )   
        .then(function(){
            res.redirect('/administrador');
        })
	},  


    //Actualizar
    editar: function(req, res){
        let activoEncontrado = db.inversion.findByPk(req.params.id, {include: [{association:"riesgos"}]});
        let tiposDeRiesgos = db.riesgo.findAll();
        Promise.all([activoEncontrado, tiposDeRiesgos])
            .then(function([inversion, riesgo]){
                res.render("editar", {inversion:inversion, riesgo:riesgo})
            }) 
    },

    actualizar: (req, res) => {
        let datos = req.body;
        let iconNSP = "";
        if(datos.tipo == "1"){
            iconNSP = "fa-group-arrows-rotate";
        }
        if(datos.tipo == "2"){
            iconNSP = "fa-seedling";
        }
        if(datos.tipo == "3"){
            iconNSP = "fa-coins";
        };
        
        db.inversion.update(
		{
			nombre_inversion: datos.nombre,
            id_riesgo: datos.tipo,
			descripcion: datos.descripcion,
            icono: iconNSP
		}, {
            where:{
                id_inversion:req.params.id
            }
        })   
        .then(function(){
            res.redirect('/administrador');
        })
	},
    
    // Para eliminar un producto
    destroy: function (req, res) {
        db.inversion.destroy({
            where: {
                id_inversion: req.params.id
            }
        })        
        .then(function(){
            res.redirect('/administrador');
        })  
    },

    ingresarDinero: async function (req, res) {
        let datos = req.body;
        let usuarioDatos = await db.usuario.findByPk(req.session.userLogged.id_usuario);
        let hoy = new Date();

        
        let historialMUpdate = db.historial_movimiento.create(
            {
                id_usuario: req.session.userLogged.id_usuario,
                id_movimiento: 1,
                fecha: hoy,
                monto_inicial: parseInt(datos.monto),
                rendimiento: 0,
                monto_final: parseInt(datos.monto),
            });
        let usuarioUpdate = db.usuario.update(
            {
                monto_billetera: usuarioDatos.monto_billetera+parseInt(datos.monto) 
            }, {
                where:{
                    id_usuario:req.session.userLogged.id_usuario
                }
            }) 
        Promise.all([historialMUpdate, usuarioUpdate])
        .then(function(){
            res.redirect('/perfil');
            })   
    },

    retirarDinero: async function (req, res) {
        let datos = req.body;
        let usuarioDatos = await db.usuario.findByPk(req.session.userLogged.id_usuario);
        let hoy = new Date();

        
        let historialMUpdate = db.historial_movimiento.create(
            {
                id_usuario: req.session.userLogged.id_usuario,
                id_movimiento: 2,
                fecha: hoy,
                monto_inicial: parseInt(datos.monto),
                rendimiento: 0,
                monto_final: parseInt(datos.monto),
            });
        let usuarioUpdate = db.usuario.update(
            {
                monto_billetera: usuarioDatos.monto_billetera-parseInt(datos.monto) 
            }, {
                where:{
                    id_usuario:req.session.userLogged.id_usuario
                }
            }) 
        Promise.all([historialMUpdate, usuarioUpdate])
        .then(function(){
            res.redirect('/perfil');
            })
    },
    invertirDinero: async function (req, res) {
        let datos = req.body;
        let usuarioDatos = await db.usuario.findByPk(req.session.userLogged.id_usuario);
        let inversionesDatos = await db.inversion.findByPk(datos.id_inversion);
        let riesgo = inversionesDatos.id_riesgo;
        let hoy = new Date();

        let random1 = Math.random();
        let signo = 0;   
        if(random1 > 0.49){
        signo =  1;
        }else{
        signo = -1;
        };
        let multiplicador = (Math.random() * (5 - 1)) + 1;
        let multiplicador2 = (Math.random() * (30 - 10)) + 10;
        let multiplicador3 = (Math.random() * (100 - 1));
        let rendimientoInv= 0;
        if(riesgo == 1){
            rendimientoInv = parseInt(datos.monto) * (multiplicador/100);
        }else if(riesgo == 2){
            rendimientoInv = parseInt(datos.monto) * (multiplicador2/100) * signo;
        }else{
            rendimientoInv = parseInt(datos.monto) * (multiplicador3/100) * signo;
           }
        let montofinal= parseInt(datos.monto)+rendimientoInv

        console.log(datos);
        console.log(multiplicador);
        console.log(multiplicador2);
        console.log(multiplicador3);
        console.log(hoy);
        console.log(riesgo);
        console.log(rendimientoInv);

        let historialMUpdate = db.historial_movimiento.create(
            {
                id_usuario: req.session.userLogged.id_usuario,
                id_movimiento: 3,
                fecha: hoy,
                monto_inicial: parseInt(datos.monto),
                rendimiento: rendimientoInv,
                monto_final: montofinal,
                id_inversion: inversionesDatos.id_inversion,
            });
        let usuarioUpdate = db.usuario.update(
            {
                monto_billetera: usuarioDatos.monto_billetera+rendimientoInv
            }, {
                where:{
                    id_usuario:req.session.userLogged.id_usuario
                }
            }) 
        Promise.all([historialMUpdate, usuarioUpdate])
        .then(function(){
            res.redirect('/perfil');
            })
    }



};

module.exports = controller2;
