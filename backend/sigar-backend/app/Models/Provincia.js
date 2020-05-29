'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provincia extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "ProvinciaHook.uuid");
  }
  
  static get primaryKey(){
    return "id";
  }
  static get incrementing(){
    return false;
  }
}

module.exports = Provincia
