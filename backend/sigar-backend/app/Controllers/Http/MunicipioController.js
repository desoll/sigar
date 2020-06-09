'use strict'
const Municipio = use('App/Models/Municipio')
const db = use('Database');

class MunicipioController {

   async criar({ request, auth, response }) {

      try {
         const dados = request.only(['designacao', 'provincia'])
         const municipioExistente = await Municipio.findBy('designacao', dados.designacao)
         const provinciaExistente = await Municipio.findBy('provincia_id', dados.provincia.id)


         if (municipioExistente != null && provinciaExistente != null) {
            console.log('municipio encontrado: ', municipioExistente.designacao)
            response
               .status(400)
               .send({ message: { error: 'Municipío já existênte.' } })
         }
         else {
            const municipio = await Municipio.create({
               designacao: dados.designacao,
               provincia_id: dados.provincia.id



            });
            return response
               .status(200)
               .send({ message: { sucess: 'Municipío inserido com sucesso.' } })
         }


      } catch (err) {
         return response
            .status(400)
            .send({ message: { err: err }, municipio: null });
      }

   }

   async listar({request,auth,response}) {
      try {
         const dados = request.only('provincia_id');

           const municipios = await db.select('id', ' designacao')
           .from('municipios')
           .where('provincia_id', dados.provincia_id)
           .orderBy('designacao')

           return response
           .send({message:{sucess:true},error: null, data: municipios});
      }
      catch (err) {
         return response
         .send({message:{sucess:true}, error: `Falha ao listar dados: ${err}`, data: null});
      }
   }

}

module.exports = MunicipioController
