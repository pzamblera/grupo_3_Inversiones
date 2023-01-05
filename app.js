const express = require('express');
const session = require('express-session');
const path = require("path");
const router = require('./src/routes/main');
const routerProducto = require("./src/routes/producto");
const routerInv = require("./src/routes/inversiones");
const methodOverride =  require('method-override');

const app = express();

const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");

app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
}));

app.use(userLoggedMiddleware);

app.set("views",path.join(__dirname,"./src/views"))
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}))
app.use("/", router);
app.use("/producto", routerProducto);
app.use("/inversiones", routerInv);

app.use(express.json());


app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
})
