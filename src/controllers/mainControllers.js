const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../dataBase/activos.json');
const activos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        res.render("login");
    },
    registro: (req, res) => {
        res.render("registro");
    }, 
    index: (req, res) => {
        res.render("index");
    }, 
    perfil: (req, res) => {
        res.render("perfil");
    },
    administrador:(req, res) => {
        const activos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render("administrador",{activos: activos})
    },
};

module.exports = controller;