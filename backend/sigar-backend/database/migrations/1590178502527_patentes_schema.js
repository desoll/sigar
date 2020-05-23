'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatentesSchema extends Schema {
  up () {
    this.table('patentes', (table) => {
    table.dropColumn('name')
    table.string('designacao').notNullable().unique()
      // alter table
    })
  }

  down () {
    this.table('patentes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PatentesSchema
