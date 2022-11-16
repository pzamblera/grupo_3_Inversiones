function movimientosInversion(sequelize, Datatypes){

    let a = 'movimiento';
  
    let b = {
      id_movimiento: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(50)}
    }
  
    let c = {camelCase: false, timestamps: false}; 
  
    const movimientos = sequelize.define(a,b,c)
  
    return movimientos;
  }
  
  
  module.exports = movimientosInversion;