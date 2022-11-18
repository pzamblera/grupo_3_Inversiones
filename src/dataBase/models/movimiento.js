function movimientosInversion(sequelize, Datatypes){

    let a = 'movimiento';
  
    let b = {
      id_movimiento: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(50)}
    }
  
    let c = {camelCase: false, timestamps: false, tableName:"Movimiento"}; 
  
    const movimientos = sequelize.define(a,b,c)
    movimientos.associate = function (modelos){
      movimientos.hasMany(modelos.historial_movimiento, {
        as:"historial",
        foreignKey: "id_movimiento"
      })
    }
  
    return movimientos;
  }
  
  
  module.exports = movimientosInversion;