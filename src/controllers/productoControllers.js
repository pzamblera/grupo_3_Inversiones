const { promiseImpl } = require('ejs');
const fs = require('fs');
const path = require('path');

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
			nombre_inversion: datos. nombre,
            id_riesgo: datos.tipo,
			descripcion: datos.descripcion,
            icono: iconNSP
		}, {
            where:{
                id_inversion:req.params.id
            }
        }
        )   
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
    }
};

module.exports = controller2;
