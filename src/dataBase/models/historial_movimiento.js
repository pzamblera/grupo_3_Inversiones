function historialMov(sequelize, Datatypes){

    let a = 'historial_movimiento';
  
    let b = {
      id_historial: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      id_usuario: {type: Datatypes.INTEGER},
      id_movimiento: {type: Datatypes.INTEGER},
      fecha: {type: Datatypes.DATE},
      monto_inicial: {type: Datatypes.FLOAT},
      rendimiento: { type: Datatypes.FLOAT},
      monto_final: {type: Datatypes.FLOAT},
      id_inversion: {type: Datatypes.INTEGER}
    }
  
    let c = {camelCase: false, timestamps: false}; 
  
    const historial = sequelize.define(a,b,c)
  
    return historial;
  }
  
  
  module.exports = historialMov;