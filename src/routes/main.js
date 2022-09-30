const express = require ("express");
const router = express.Router();
const controller = require("../controllers/mainControllers")

router.get("/", controller.index)
router.get("/login", controller.login)
router.get("/registro", controller.registro)
router.get("/perfil", controller.perfil)

module.exports = router;