'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rua extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "RuaHook.uuid");
  }
  
  static get primaryKey(){
    return "id";
  }
  static get incrementing(){
    return false;
  }
 municipios(){
    return this.belongsTo('App/Models/Municipio')
 }
 esquadras() {
   return this.hasMany('App/Models/Esquadra')
 }
 usuarios() {
   return this.hasMany('App/Models/Usuario')
 }
}

module.exports = Rua
