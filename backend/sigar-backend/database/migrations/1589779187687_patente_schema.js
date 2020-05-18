'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatenteSchema extends Schema {
  up () {
    this.create('patentes', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('patentes')
  }
}

module.exports = PatenteSchema
