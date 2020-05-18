'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MunicipioSchema extends Schema {
  up () {
    this.create('municipios', (table) => {
      table.increments()
      table.integer('provincia_id')
      .unsigned()
      .references('id')
      .inTable('provincias')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
    table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('municipios')
  }
}

module.exports = MunicipioSchema
