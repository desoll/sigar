'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinciasSchema extends Schema {
  up () {
    this.create('provincias', (table) => {
      table.increments()
      table.integer('pais_id')
        .unsigned()
        .references('id')
        .inTable('paises')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('provincias')
  }
}

module.exports = ProvinciasSchema
