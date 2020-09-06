'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.uuid('id').primary()
      table.string('nome').notNullable()
      table.string('telefone').notNullable()
      table.string('email')
      table.string('senha')
      table.specificType('foto', "longblob")
      table.uuid('rua_id').references('ruas.id').onDelete('cascade').onUpdate('cascade')
      table.uuid('esquadra_id').references('esquadras.id').onDelete('cascade').onUpdate('cascade')
      table.uuid('patente_id').references('patentes.id').onDelete('cascade').onUpdate('cascade')
      table.uuid('estado_id').references('estados.id').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
