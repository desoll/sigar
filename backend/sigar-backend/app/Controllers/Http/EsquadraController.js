'use strict'
const Esquadra = use('App/Models/Esquadra')
const db = use('Database')

class EsquadraController {

  async criar({ request, auth, response })
  {
    try{

      const dados  = request.only(['designacao','rua'])
      const exist  = await Esquadra.findBy('designacao', dados.designacao)
      const existB = await Esquadra.findBy('rua_id', dados.rua)

      if(exist != null && existB != null)
      {
        response
           .status(400)
           .send({message: { error: 'Esquadra já existênte.' }})
      }
      else{
           const esquadra = await Esquadra.create({
             designacao: dados.designacao,
             rua_id: dados.rua
           });
           console.log('Dados: ', esquadra)
           return response
               .status(200)
               .send({message: {sucess: 'Esquadra inserida com sucesso.'} })
      }
    }
    catch(err) {
      console.log('Erro: ', err)
      return response
        .status(400)
        .send({message: { err: err}, esquadra: null});
    }

  }


  async listar({ request, auth, response }) {
    try {
         const esquadras = await db.raw('SELECT id, INITCAP(designacao) as designacao FROM esquadras order by designacao desc');
  
      return response
        .send({ message: { sucess: true }, error: null, data: esquadras[0] });
    }
    catch (err) {
      return response
        .send({ message: { sucess: true }, error: `Falha ao listar dados: ${err}`, data: null });
    }
  }

  async listarGeral({request, auth, response}){

     try{
         const dados = await db.select('p.id as provincia_id ', 'm.id as municipio_id ', ' b.id as bairro_id ', 'r.id as rua_id',' e.id ', 'p.designacao as provincia', ' m.designacao as municipio ', ' b.designacao as bairro', ' r.designacao as rua ','e.designacao as esquadra')
         .from('esquadras as e')
         .innerJoin('ruas as r', 'r.id', 'e.rua_id')
         .innerJoin('bairros as b', 'r.bairro_id', 'b.id')
         .innerJoin('municipios as m', 'b.municipio_id', 'm.id')
         .innerJoin('provincias as p', 'm.provincia_id', 'p.id')

        return response
                .send({ message: { sucess: true }, error: null, data: dados });
     }
     catch(err){
      return response
      .send({ message: { sucess: true }, error: `Falha ao listar dados: ${err}`, data: null });
     }

  }

  async editarDados({request, auth, response}){
      try{
            const dados = request.only(['id']);
            const esquadras = await db.select('p.id as provincia_id ', 'm.id as municipio_id ', ' b.id as bairro_id ', 'r.id as rua_id',' e.id ', 'p.designacao as provincia', ' m.designacao as municipio ', ' b.designacao as bairro', ' r.designacao as rua ','e.designacao as esquadra')
            .from('esquadras as e')
            .innerJoin('ruas as r', 'r.id', 'e.rua_id')
            .innerJoin('bairros as b', 'r.bairro_id', 'b.id')
            .innerJoin('municipios as m', 'b.municipio_id', 'm.id')
            .innerJoin('provincias as p', 'm.provincia_id', 'p.id')
            .where(' e.id', dados.id);
          return response
           .send({ message: {sucess: true}, error: null, data: esquadras});
      }
      catch(err){
        return response
         .send({ message: {err: err }, error: `Falha ao listar dados: ${err}`, esquadras: null});
      }
  }

  async actualizarDados({request, auth, response}){
    try{
      const dados  = request.only(['id','designacao','rua']);
      const esquadra = await Esquadra.findOrFail(dados.id)
      
      esquadra.merge({
        id: dados.id,
        designacao: dados.designacao,
        rua_id: dados.rua
      });
     await esquadra.save();
     return response
             .status(200)
             .send({message: {sucess: 'Dados actualizados com sucesso.'}});
    }
    catch(err){
      return response
        .status(400)
        .send({message: {err: err }, esquadra: null })
    }
  }

  async apagar({request, auth, response}){
    try{
         const dados = request.only(['esquadra_id']);
         const esquadra = await Esquadra.findOrFail(dados.esquadra_id);
         await esquadra.delete();

         return response
                 .status(200)
                 .send({ message: {sucess: 'Registo eliminado com sucesso.'}})
    }
    catch(err){
      return response
      .status(400)
      .send({ message: { sucess: true }, error: `Falha ao apagar linha selecionada: ${err}`, data: null });
    }
  }

}

module.exports = EsquadraController
