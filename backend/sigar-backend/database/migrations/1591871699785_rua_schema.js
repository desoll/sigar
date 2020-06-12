'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuaSchema extends Schema {
  up () {
    this.create('ruas', (table) => {
      table.uuid('id').primary()
      table.string('designacao').notNullable().unique()
      table.uuid('bairro_id').notNullable()
      table.foreign('bairro_id').references('bairros.id').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('ruas')
  }
}

module.exports = RuaSchema
