const express = require('express');
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
})

app.get("/index.html", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get("/perfil.html", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/perfil.html'));
});

app.get("/login.html", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get("/producto.html", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/producto.html'));
});

app.get("/registro.html", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
});

app.get('*',function(req,res){
    res.send("Ruta restringida.");
});