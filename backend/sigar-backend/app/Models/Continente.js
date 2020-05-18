'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Continente extends Model {

    static boot(){
        super.boot();
    }


    paises(){

        return this.hasMany('App/Models/Paise');
    }


}

module.exports = Continente
