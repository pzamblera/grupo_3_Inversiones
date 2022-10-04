const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../RUTA');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
};

module.exports = controller;