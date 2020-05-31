'use strict'
const uuidv4 = require("uuid/v4");
const db = use("Database");
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

const Factory = use('Factory')

Factory.blueprint('App/Models/Estado', async (faker,i,data) =>
{
  return {
    designacao: ['activo', 'inactivo'][i]
  }
})

Factory.blueprint('App/Models/Provincia', async (faker,i,data) =>
{
  return {
    designacao: [
      'Bengo','Benguela','Bié',
      'Cabinda','Cuando Cubango','Cunene','Cuanza Norte','Cuanza Sul',
      'Huambo','Huíla',
      'Luanda','Lunda Norte', 'Lunda Sul',
      'Malanje','Moxico',
      'Namibe',
      'Uíge',
      'Zaire',
    ][i],
    estado_id: data.estado_id
    
  }
})
