'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaiseSchema extends Schema {
  up () {
    this.create('paises', (table) => {
      table.increments()
      table.integer('continente_id')
        .unsigned()
        .references('id')
        .inTable('continentes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('paises')
  }
}

module.exports = PaiseSchema
