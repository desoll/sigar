'use strict'
const Usuario = use('App/Models/Usuario')
const db = use('Database')

class UsuarioController {

async criar ({request, auth, response }){
  try
  {
      const dados = request.only(['nome', 'telefone','email','senha','foto','rua','esquadra','patente'])
     
      const verificarEmail = await Usuario.findBy('nome', dados.email)
      const verificarTelefone = await Usuario.findBy('telefone', dados.telefone)
      const estado = await db.select('id').from('estados')
      .where('designacao','activo')

      console.log('Estado', estado[0].id)

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
               estado_id: estado[0].id
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

async listarTodos({request, auth, response}){
    
  try{
     
    const dados = await db.select('u.id ', 'u.nome ', 'u.telefone ', 'u.email ', 'u.foto ', 'u.created_at ', 'u.updated_at '
    , 'e.designacao as estado ', 'es.designacao as esquadra ', 'p.designacao as patente ', 'r.designacao as rua')
                   .from('usuarios as u')
                   .innerJoin('estados as e','u.estado_id', 'e.id')
                   .innerJoin('esquadras as es','u.esquadra_id','es.id')
                   .innerJoin('patentes as p','u.patente_id','p.id')
                  .innerJoin('ruas as r','u.rua_id','r.id');
      return response
        .status(200) 
        .send({ message: { sucess: true }, error: null, data: dados });

  }catch(err){
    return response
    .status(400)
    .send({message: { sucess: false}, error: `Falha ao listar dados: ${err}`, data: null });
  }

}


}

module.exports = UsuarioController
