'use strict'
const Patente = use('App/Models/Patente');
const db = use('Database');

class PatenteController {

  async criar({ request, auth, response }) {
    try {
      const dados = request.only(['designacao'])
      const patenteDesignacao = await Patente.findBy('designacao', dados.designacao);

      if (patenteDesignacao != null) {
        return response
          .status(400)
          .send({ message: { error: 'patente já existênte' } });

      }
      else {
        const patente = await Patente.create(dados);
        return response
          .status(200)
          .send({ message: { sucess: 'Patente inserida com sucesso.' } })
      }
    }
    catch (err) {

      return response
        .status(400)
        .send({ message: { err: err }, patente: null });
    }

  }

  async listar({ request, auth, response }) {
    try {
         const patentes = await db.raw('SELECT id, INITCAP(designacao) as designacao FROM patentes order by designacao desc');
  
      return response
        .send({ message: { sucess: true }, error: null, data: patentes[0] });
    }
    catch (err) {
      return response
        .send({ message: { sucess: true }, error: `Falha ao listar dados: ${err}`, data: null });
    }
  }

}

module.exports = PatenteController
