const express = require ("express");
const routerProducto = express.Router();
const controller2 = require("../controllers/productoControllers")

routerProducto.get("/", controller2.producto)

routerProducto.get("/crear", controller2.crear1)
routerProducto.post("/crear", controller2.crear2)

routerProducto.get("/editar/:id", controller2.editar)
routerProducto.put("/editar/:id", controller2.actualizar)

routerProducto.delete('/editar/:id', controller2.destroy)


module.exports = routerProducto;