const fs = require('fs');
const path = require('path');
//const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../dataBase/activos.json');
const activos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller2 = {
    producto: (req, res) => {
          const producto = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
          res.render("producto",{activos: activos});
     },

    //crear
    crear1: (req, res) => {
        res.render('crear');
	},

    crear2: (req, res) => {
        let datos = req.body;
		let idNuevoActivo = (activos[activos.length-1].id)+1;
        let iconNSP = "";
        if(datos.tipo == "Bajo riesgo"){
            iconNSP = "fa-group-arrows-rotate";
        }
        if(datos.tipo == "Riesgo medio"){
            iconNSP = "fa-seedling";
        }
        if(datos.tipo == "Alto riesgo"){
            iconNSP = "fa-coins";
        };

		let nuevoActivo ={
			"id": idNuevoActivo,
			"nombre": datos.nombre,
            "tipo": datos.tipo,
			"descripcion": datos.descripcion,
            "icono": iconNSP
		};

		activos.push(nuevoActivo);
		fs.writeFileSync(productsFilePath,JSON.stringify(activos, null, " "),'utf-8');

		res.redirect('/administrador');
	},

    //Actualizar
    editar: (req, res) => {

        let id = req.params.id;
        let activoEncontrado=null;

        for (let x of activos){
            if (id==x.id){
                activoEncontrado=x;
                break;
            }
        }

        res.render('editar',{activo: activoEncontrado});
    },

    actualizar: (req, res) => {
        let idActivo = req.params.id;
        let datosActivo = req.body;
        let iconNSP = "";
        if(datosActivo.tipo == "Bajo riesgo"){
            iconNSP = "fa-group-arrows-rotate";
        }
        if(datosActivo.tipo == "Riesgo medio"){
            iconNSP = "fa-seedling";
        }
        if(datosActivo.tipo == "Alto riesgo"){
            iconNSP = "fa-coins";
        };

		for (let x of activos){
			if (x.id==idActivo){
				x.nombre = datosActivo.nombre;
				x.tipo = datosActivo.tipo;
				x.descripcion = datosActivo.descripcion;
                x.icono= iconNSP;
				break;
			}
		}

		fs.writeFileSync(productsFilePath,JSON.stringify(activos, null, " "),'utf-8');

		res.redirect('/administrador');        
    },
    // Para eliminar un producto
    destroy : (req, res) => {
        let idActivoX = req.params.id;

        let nuevaListaDeActivos = activos.filter(function(e){
            return e.id!=idActivoX;
        });

        fs.writeFileSync(productsFilePath,JSON.stringify(nuevaListaDeActivos, null, " "),'utf-8');

        res.redirect('/administrador');    
    }
};



module.exports = controller2;
