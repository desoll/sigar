'use strict'
const Bairro = use('App/Models/Bairro')
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
}

module.exports = BairroController
