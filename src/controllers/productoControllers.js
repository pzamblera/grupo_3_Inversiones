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

		let nuevoActivo ={
			"id": idNuevoActivo,
			"nombre": datos.nombre,
            "tipo": datos.tipo,
			"descripcion": datos.descripcion
		};

		activos.push(nuevoActivo);
		fs.writeFileSync(productsFilePath,JSON.stringify(activos, null, " "),'utf-8');

		res.redirect('/producto');
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

		for (let x of activos){
			if (x.id==idActivo){
				x.nombre = datosActivo.nombre;
				x.tipo = datosActivo.tipo;
				x.descripcion = datosActivo.descripcion;
				break;
			}
		}

		fs.writeFileSync(productsFilePath,JSON.stringify(activos, null, " "),'utf-8');

		res.redirect('/producto');        
    },
    // Para eliminar un producto
    destroy : (req, res) => {
        let idActivoX = req.params.id;

        let nuevaListaDeActivos = activos.filter(function(e){
            return e.id!=idActivoX
        });

        fs.writeFileSync(productsFilePath,JSON.stringify(nuevaListaDeActivos, null, " "),'utf-8');

        res.redirect('/producto');    
    }
};



module.exports = controller2;
