const DB = require ("../dataBase/models");
const Op = DB.Sequelize.Op;

const controller3 = {
    list: (req, res) => {
        DB.inversion
            .findAll()
            .then(inv =>{
                return res.status(200).json({
                count: inv.length,
                countByCategory:/*{
                    DB.riesgo.findAll().then(
                    for(let i=0; i<riesgo.length; i++ ){
                        return 
                    })
                }*/0,
                product: inv,
                status: 200
            })
            })
    },
    listCat: (req, res) => {
        DB.riesgo
            .findAll()
            .then(categorias =>{
                return res.status(200).json({
                count: categorias.length,
                status: 200
            })
            })
    }
}

module.exports = controller3;