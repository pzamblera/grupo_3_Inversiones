const express = require ("express");
const routerProducto = express.Router();
const controller2 = require("../controllers/productoControllers")

routerProducto.get("/", controller2.producto)

module.exports = routerProducto;