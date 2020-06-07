'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Municipio extends Model {

  static boot() {
    super.boot();
    this.addHook("beforeCreate", "MunicipioHook.uuid");
  }
  
  static get primaryKey(){
    return "id";
  }
  static get incrementing(){
    return false;
  }
    provincias(){
     return this.belongsTo('App/Models/Provincia')
  }

}

module.exports = Municipio
