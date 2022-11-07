const express = require ("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require("../controllers/mainControllers")

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

router.get("/", controller.index)
router.get("/login", controller.login)
router.get("/registro", controller.registro)
router.post("/registro", uploadFile.single("avatar"), controller.registro2)
router.get("/perfil", controller.perfil)
router.get("/administrador", controller.administrador)


module.exports = router;