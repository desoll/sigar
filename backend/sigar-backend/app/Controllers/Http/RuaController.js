'use strict'
const Rua = use('App/Models/Rua')
const db = use('Database')

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

  async listarEndereco({request,auth, response}) {

    const dados = await db.select('p.id as provincia_id ','m.id as municipio_id ',' b.id as bairro_id ','r.id as rua_id','p.designacao as provincia',' m.designacao as municipio ',' b.designacao as bairro',' r.designacao as rua ')
    .from('ruas as r')
    .innerJoin('bairros as b', 'r.bairro_id','b.id')
    .innerJoin('municipios as m', 'b.municipio_id','m.id')
    .innerJoin('provincias as p', 'm.provincia_id','p.id')
     
    return response 
    .send({message:{sucess:true}, error: null, data: dados});
      
  }
  catch (err) {
    return response
    .send({message:{sucess:true}, error: `Falha ao listar dados: ${err}`, data: null});
 }

}

module.exports = RuaController
