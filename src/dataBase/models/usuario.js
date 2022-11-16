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
      administrador: {type: Datatypes.BOOLEAN}
    }
  
    let c = {camelCase: false, timestamps: false}; 
  
    const usuarios = sequelize.define(a,b,c)
  
    return usuarios;
  }
  
  
  module.exports = listaUsuarios;