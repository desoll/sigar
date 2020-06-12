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
    estados(){
     return this.belongsTo('App/Models/Estado')
  }
    municipios() {
    return this.hasMany('App/Models/Municipio','id','provincia_id')
 }

}

module.exports = Provincia
