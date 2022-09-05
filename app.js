const express = require('express');
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log("Servidor corriendo");
    });

app.get("/", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get("/perfil", function(req, res){
    res.sendFile(path.resolve(__dirname, './views/perfil.html'));
});

app.get('*',function(req,res){
    res.send("Ruta restringida.");
});