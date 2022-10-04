const express = require ("express");
const router = express.Router();
const main = require("../controllers/mainControllers")

router.get("/", main.index)
router.get("/login", main.login)
router.get("/registro", main.registro)
router.get("/perfil", main.perfil)


module.exports = router;