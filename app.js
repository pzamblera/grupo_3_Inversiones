const express = require('express');
const path = require("path");
const router = require('./src/routes/main');
const routerProducto = require("./src/routes/producto")

const app = express();
app.set("views",path.join(__dirname,"./src/views"))
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, '/public')));

app.use("/", router);
app.use("/producto", routerProducto);


app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
})
