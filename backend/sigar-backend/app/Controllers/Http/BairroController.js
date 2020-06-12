'use strict'
const Bairro = use('App/Models/Bairro')
const db = use('Database');
class BairroController {

  async criar({ request, auth, response }) {
    try {
      const dados = request.only(['designacao', 'municipio'])
      const verificarBairro = await Bairro.findBy('designacao', dados.designacao)
      const verificarMunicipio = await Bairro.findBy('municipio_id', dados.municipio.id)

      if (verificarMunicipio != null && verificarBairro != null) {
        response
          .status(400)
          .send({ message: { error: 'Bairro já existênte.' } })
      }
      else {
        const bairro = await Bairro.create({
          designacao: dados.designacao,
          municipio_id: dados.municipio.id
        });
        return response
          .status(200)
          .send({ message: { sucess: 'Bairro inserido com sucesso.' } })
      }

    }
    catch (err) {
      return response
        .status(400)
        .send({ message: { err: err }, bairro: null });
    }

  }

  async listar({request, auth, response}){
    try{
          const dados = request.only(['municipio_id']);
          const bairros = await db.select('id','designacao')
          .from('bairros')
          .where('municipio_id', dados.municipio_id)
          .orderBy('designacao')

          return response
          .send({message:{sucess:true}, error:null, data: bairros})
    }
    catch(err){
      return response
      .send({message:{sucess:true}, error: `Falha ao listar dados: ${err}`, data: null});
    }
  }
}

module.exports = BairroController
