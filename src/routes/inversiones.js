const express = require("express");
const routerInv = express.Router();

const controller3 = require("../controllers/inversionesControllers");

routerInv.get("/", controller3.list);
routerInv.get("/categorias", controller3.listCat);
routerInv.get("/usuarios", controller3.listadoUsuarios);
routerInv.get("/usuarios/:id", controller3.idUsuarios);


module.exports = routerInv;