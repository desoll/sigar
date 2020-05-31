'use strict'

/*
|--------------------------------------------------------------------------
| ProvinciaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const db = use('Database')

class ProvinciaSeeder {
  async run () {
     const estado = await db
     .select('id')
     .table('estados').where('designacao','activo')
     .first()
     const provincias = await Factory.model('App/Models/Provincia').createMany(18,{estado_id: estado.id})

  }
}

module.exports = ProvinciaSeeder
