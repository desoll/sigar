'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EsquadraSchema extends Schema {
  up () {
    this.create('esquadras', (table) => {
      table.uuid('id').primary()
      table.string('designacao').notNullable().unique()
      table.uuid('rua_id').notNullable()
      table.foreign('rua_id').references('ruas.id').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('esquadras')
  }
}

module.exports = EsquadraSchema
