'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bairro extends Model {
  static boot(){
    super.boot();
    this.addHook("beforeCreate","BairroHook.uuid");
  }
  static get primaryKey(){
    return 'id';
  }
  static get incrementing(){
    return false;
  }
  municipios(){
    return this.belongsTo('App/Models/Municipio')
  }

}

module.exports = Bairro
