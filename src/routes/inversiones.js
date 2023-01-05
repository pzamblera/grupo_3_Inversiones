const express = require("express");
const routerInv = express.Router();

const controller3 = require("../controllers/inversionesControllers");

routerInv.get("/", controller3.list);
routerInv.get("/categorias", controller3.listCat)


module.exports = routerInv;