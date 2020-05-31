'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Estado extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "EstadoHook.uuid");
  }
  
  static get primaryKey(){
    return "id";
  }
  static get incrementing(){
    return false;
  }

  provincias() {
     return this.hasMany('App/Models/Provincia')
  }

}

module.exports = Estado
