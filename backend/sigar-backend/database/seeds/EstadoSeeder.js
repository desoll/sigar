'use strict'

/*
|--------------------------------------------------------------------------
| EstadoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EstadoSeeder {
  async run () {
    const estado = await Factory.model('App/Models/Estado').createMany(2)
  }
}

module.exports = EstadoSeeder
