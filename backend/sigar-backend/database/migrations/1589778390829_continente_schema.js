'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContinenteSchema extends Schema {
  up () {
    this.table('continentes', (table) => {
      table.dropColumn('description')
      table.string('name')
      // alter table
    })
  }

  down () {
    this.table('continentes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ContinenteSchema
