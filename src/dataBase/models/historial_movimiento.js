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
  
    let c = {camelCase: false, timestamps: false}; //hay que ver si va false en timestamps, porque aca tenemos atributos que son fecha!
  
    const historial = sequelize.define(a,b,c)

    historial.associate = function (modeloUno){
      historial.belongsTo(modeloUno.usuario, {
        as:"usuarios",
        foreignKey: "id_usuario"
      })
    }

    historial.associate = function (modeloDos){
      historial.belongsTo(modeloDos.movimiento, {
        as:"movimientos",
        foreignKey: "id_movimiento"
      })
    }

    historial.associate = function (modeloTres){
      historial.belongsTo(modeloTres.inversion, {
        as:"inversiones",
        foreignKey: "id_inversion"
      })
    }
  
    return historial;
  }
  
  
  module.exports = historialMov;