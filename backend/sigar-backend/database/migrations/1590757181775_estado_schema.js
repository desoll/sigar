'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstadoSchema extends Schema {
  up () {
    this.create('estados', (table) => {
      table.uuid('id').primary()
      table.string('designacao').notNullable().unique()
      table.timestamps()
    })
  }
  down () {
    this.drop('estados')
  }
}

module.exports = EstadoSchema
