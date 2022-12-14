function listaUsuarios(sequelize, Datatypes){

    let a = 'usuario';
  
    let b = {
      id_usuario: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(50)},
      apellido: {type: Datatypes.STRING(80)},
      email: {type: Datatypes.STRING(80)},
      clave: {type: Datatypes.STRING(200)},
      avatar: { type: Datatypes.STRING(80)},
      monto_billetera: {type: Datatypes.FLOAT},
      administrador: {type: Datatypes.BOOLEAN} //ver si esta bien este tipo de dato, en nuestra base de datos, esta como "BIT"
    }
  
    let c = {camelCase: false, timestamps: false, tableName: "Usuario"}; 
  
    const usuarios = sequelize.define(a,b,c)
    usuarios.associate = function (modelos){
      usuarios.hasMany(modelos.historial_movimiento, {
        as:"historial",
        foreignKey: "id_usuario"
      })
    }
  
    return usuarios;
  }
  
  
  module.exports = listaUsuarios;