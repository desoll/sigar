'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Esquadra extends Model {
  static boot(){
    super.boot();
    this.addHook("beforeCreate", "EsquadraHook.uuid");
  }

  static get primaryKey(){
    return "id";
  }
  static get incrementing(){
    return false;
  }
  ruas(){
    return this.belongsTo('App/Models/Rua')
 }
}

module.exports = Esquadra
