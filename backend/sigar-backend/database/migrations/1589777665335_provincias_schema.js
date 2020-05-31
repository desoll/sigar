'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinciasSchema extends Schema {
  up () {
    this.create('provincias', (table) => {
      table.uuid('id').primary()
      table.string('designacao').notNullable().unique()
      table.uuid('estado_id')
      table.foreign('estado_id').references('estados.id')
      .onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('provincias')
  }
}

module.exports = ProvinciasSchema
