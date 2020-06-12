'use strict'
const Rua = use('App/Models/Rua')

class RuaController {

  async criar({request,auth,response}){
    try{
      const dados = request.only(['designacao', 'bairro'])
      const ruaExistente = await Rua.findBy('designacao', dados.designacao)
      const bairroExistente = await Rua.findBy('bairro_id', dados.bairro.id)
       
      if (bairroExistente != null && ruaExistente != null) {
        response
           .status(400)
           .send({ message: { error: 'Rua já existênte.' } })
     }
     else {
      const rua = await Rua.create({
         designacao: dados.designacao,
         bairro_id: dados.bairro.id
      });
      return response
         .status(200)
         .send({ message: { sucess: 'Rua inserido com sucesso.' } })
   }

    }
    catch(err){
      return response
      .status(400)
      .send({ message: { err: err }, rua: null });
    }
  }

}

module.exports = RuaController
