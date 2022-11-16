function carteraInversion(sequelize, Datatypes){

    let a = 'inversion';
  
    let b = {
      id_inversion: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_inversion: {type: Datatypes.STRING(50)},
      descripcion: {type: Datatypes.TEXT},
      id_riesgo: { type: Datatypes.INTEGER}
    }
  
    let c = {camelCase: false, timestamps: false}; 
  
    const inversiones = sequelize.define(a,b,c)
  
    return inversiones;
  }
  
  
  module.exports = carteraInversion;