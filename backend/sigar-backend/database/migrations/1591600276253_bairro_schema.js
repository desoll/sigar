'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BairroSchema extends Schema {
  up () {
    this.create('bairros', (table) => {
      table.uuid('id').primary()
      table.string('designacao').notNullable().unique()
      table.uuid('municipio_id')
      table.foreign('municipio_id').references('municipios.id').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('bairros')
  }
}

module.exports = BairroSchema
