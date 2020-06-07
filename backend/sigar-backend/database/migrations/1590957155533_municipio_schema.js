'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MunicipioSchema extends Schema {
  up () {
    this.create('municipios', (table) => {
      table.uuid('id').primary()
      table.string('designacao')
      table.uuid('provincia_id')
      table.foreign('provincia_id').references('provincias.id').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('municipios')
  }
}

module.exports = MunicipioSchema
