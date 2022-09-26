const express = require ("express");
const router = express.Router();
const main = require("../controllers/mainControllers")

router.get("/", main.index)
router.get("/login", main.login)
router.get("/registro", main.registro)
router.get("/index", main.index)
router.get("/perfil", main.perfil)
router.get("/producto", main.producto)

module.exports = router;