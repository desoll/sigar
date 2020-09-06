'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {
   static boot(){
    super.boot();
    this.addHook("beforeCreate","UsuarioHook.uuid");
  }
  static get primaryKey(){
    return 'id';
  }
  static get incrementing(){
    return false;
  }
 ruas(){
    return this.belongsTo('App/Models/Rua')
  }
  esquadras(){
    return this.belongsTo('App/Models/Esquadra')
  }
  patentes(){
    return this.belongsTo('App/Models/Patente')
  }

}

module.exports = Usuario
