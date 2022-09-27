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