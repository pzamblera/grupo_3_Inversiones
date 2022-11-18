function carteraInversion(sequelize, Datatypes){

    let a = 'inversion';
  
    let b = {
      id_inversion: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_inversion: {type: Datatypes.STRING(50)},
      descripcion: {type: Datatypes.TEXT},
      id_riesgo: { type: Datatypes.INTEGER}
    }
  
    let c = {camelCase: false, timestamps: false, tableName:"Inversion"}; 
  
    const inversiones = sequelize.define(a,b,c)

    inversiones.associate = function (modelos){
      inversiones.hasMany(modelos.historial_movimiento, {
        as:"historial",
        foreignKey: "id_inversion"
      });
      inversiones.belongsTo(modelos.riesgo, {
        as:"riesgos",
        foreignKey: "id_riesgo"
      })
    }
  
    return inversiones;
  }
  
  
  module.exports = carteraInversion;