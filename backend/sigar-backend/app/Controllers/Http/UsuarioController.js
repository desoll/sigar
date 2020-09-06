'use strict'
const Usuario = use('App/Models/Usuario')
const db = use('Database')

class UsuarioController {

async criar ({request, auth, response }){
  try
  {
      const dados = request.only(['nome', 'telefone','email','senha','foto','rua','esquadra','patente'])
       console.log('Dados: ', dados)
      const verificarEmail = await Usuario.findBy('nome', dados.email)
      const verificarTelefone = await Usuario.findBy('telefone', dados.telefone)
      const estado = await db.select('id').from('estados')
      .where('designacao','activo')

      console.log('Estado', estado)

       if (verificarEmail != null || verificarTelefone != null) { 
            response
          .status(400)
          .send({ message: { error: 'Usuário já existênte.' } })
        }
        else{
           const usuario = await Usuario.create({
               nome: dados.nome,
               telefone: dados.telefone,
               email: dados.email,
               senha: dados.senha,
               foto: dados.foto,
               rua_id: dados.rua,
               esquadra_id: dados.esquadra,
               patente_id: dados.patente,
               estado_id: estado.id
           });
             return response
          .status(200)
          .send({ message: { sucess: 'Usuário inserido com sucesso.' } })
        }
  }
  catch(err)
  {
   return response
    .status(400)
    .send({ message: { err: err }, usuario: null });
}
}
}

module.exports = UsuarioController
