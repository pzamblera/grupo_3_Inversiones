const express = require('express');
const session = require('express-session');
const path = require("path");
const router = require('./src/routes/main');
const routerProducto = require("./src/routes/producto")
const methodOverride =  require('method-override');

const app = express();

app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
}));

app.set("views",path.join(__dirname,"./src/views"))
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}))
app.use("/", router);
app.use("/producto", routerProducto);

app.use(express.json());


app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
})
