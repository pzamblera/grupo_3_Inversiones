function tipoDeRiesgo(sequelize, Datatypes){

    let a = 'riesgo';
  
    let b = {
      id_riesgo: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_riesgo: {type: Datatypes.STRING(50)}
    }
  
    let c = {camelCase: false, timestamps: false, tableName:"Riesgo"}; 
  
    const riesgos = sequelize.define(a,b,c)
    
    riesgos.associate = function (modelos){
      riesgos.hasMany(modelos.inversion, {
        as:"inversiones",
        foreignKey: "id_riesgo"
      })
    }
  
    return riesgos;
  }
  
  
  module.exports = tipoDeRiesgo;