const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');


//const productsFilePath = path.join(__dirname, '../RUTA');
const producto = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


/*const controller = {
     producto: (req, res) => {
          const producto = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
          res.render("producto",{productos: producto});
     },

    crear
	    create: (req, res) => {
            res.render('VISTA');
        },*/

    /*guardar: (req, res) => {

        let errors = validationResult(req);

        if ( errors.isEmpty() ) {

            idNuevo=0;

        for (let x of productos){
            if (idNuevo<x.id){
                idNuevo=x.id;
            }
        }

        idNuevo++;

        //let nombreImagen = req.file.filename;


        let productoNuevo =  {
            id: idNuevo,
            nombre: req.body.name ,
            descripcion: req.body.description,
            imagen: 'vacio.jpg'
        };

        products.push(productoNuevo);

        fs.writeFileSync(productsFilePath, JSON.stringify(producto,null,' '));

        res.redirect('/');

        
        }
        else{
            res.render('VISTA', {errors: errors.array() } ); 
        }

        
    },*/

    //Actualizar
	/*editar: (req, res) => {

		let id = req.params.id;
		let productoEncontrado;

		for (let x of productos){
			if (id==x.id){
				productoEncontrado=x;
			}
		}

		res.render('VISTA',{ProductoaEditar: productoEncontrado});
	},

	update: (req, res) => {
		
		let id = req.params.id;
		let productoEncontrado;

		for (let x of products){
			if (id==x.id){
				x.nombre= req.body.nombre;
				x.descripcion= req.body.descripcion;
				x.imagen= req.body.imagen;
				break;
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');
	},*/
    /*	Baja
	destroy : (req, res) => {

		let id = req.params.id;
		let ProductoEncontrado;

		let Nproducts = products.filter(function(e){
			return id!=e.id;
		})

		for (let producto of products){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, 'RUTA', ProductoEncontrado.imagen));

		fs.writeFileSync(productsFilePath, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
	}*/

// };

// module.exports = controller;