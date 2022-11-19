function carteraInversion(sequelize, Datatypes){

    let a = 'inversion';
  
    let b = {
      id_inversion: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_inversion: {type: Datatypes.STRING(50)},
      descripcion: {type: Datatypes.TEXT},
      id_riesgo: { type: Datatypes.INTEGER}
    }
  
    let c = {camelCase: false, timestamps: false, tableName:"Inversion"}; 
  
    const inversion = sequelize.define(a,b,c)

    inversion.associate = function (modelos){
      inversion.hasMany(modelos.historial_movimiento, {
        as:"historial",
        foreignKey: "id_inversion"
      });
      inversion.belongsTo(modelos.riesgo, {
        as:"riesgos",
        foreignKey: "id_riesgo"
      })
    }
  
    return inversion;
  }
  
  
  module.exports = carteraInversion;