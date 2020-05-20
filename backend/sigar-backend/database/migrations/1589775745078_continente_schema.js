'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContinenteSchema extends Schema {
  up () {
    this.create('continentes', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('continentes')
  }
}

module.exports = ContinenteSchema
