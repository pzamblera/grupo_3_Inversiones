const express = require ("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require("express-validator");
const controller = require("../controllers/mainControllers");
const guestMiddleware = require ("../middlewares/guestMiddleware")
const authMiddleware = require ("../middlewares/authMiddleware");

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


const validaciones = [
    body("nombre").notEmpty().withMessage("Por favor, debes ingresar un nombre"),
    body("apellido").notEmpty().withMessage("Por favor, debes ingresar un apellido"),
    body("email")
        .notEmpty().withMessage("Por favor, ingresar un mail").bail()
        .isEmail().withMessage("Por favor, debes ingresar un mail válido").bail(),
    body("contrasena").isLength({min:4}).withMessage("Por favor, ingresar contraseña con 4 o mas carateres"),
    body("avatar").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".png", ".jpg", ".gif", ".tiff"];
        
        if (!file ){
            throw new Error ("Por favor, subir una imagen en formato .PNG, .JPG, .GIF o .TIFF");
        } else {
            let fileExtensions = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtensions)) {
                throw new Error("Error: las extensiones permitidas son .PNG, .JPG, .GIF o .TIFF");
        }
        }
        return true;
    })
];

router.get("/", controller.index)
router.get("/login", guestMiddleware, controller.login)
/* router.post("/login", [
   check("email").isEmail().withMessage("email invalido"),
   check("password").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
], controller.processLogin) */
router.get("/registro", guestMiddleware, controller.registro)
router.post("/registro", uploadFile.single("avatar"), validaciones, controller.registro2)
router.get("/perfil", authMiddleware, controller.perfil)
router.post("/perfil", controller.loginProcess)
router.get("/administrador", authMiddleware, controller.administrador)
router.get("/logout", controller.logout);
router.get("/ingresar", controller.ingresar);
router.get("/retirar", controller.retirar);
router.get("/invertir", controller.vistaInversion)
router.get("/carrito", controller.carrito)
router.get("/verCarrito", controller.verCarrito)
router.get("/usuarios", controller.listadoUsuarios)
router.get("/usuarios/:id", controller.idUsuarios)

module.exports = router;