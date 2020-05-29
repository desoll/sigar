'use strict'

const Provincia = use('App/Models/Provincia');
const db = use('Database');

class ProvinciaController {
  
  async criar({ request, auth, response }) {

    try {
          const dados = request.only(['designacao'])
          const provinciaDesignacao = await Provincia.findBy('designacao', dados.designacao);

          if(provinciaDesignacao != null){
            return response
            .status(208)
            .send({message:{sucess:'província já existênte'}});
  
          }
          
          const provincia = await Provincia.create(dados);
          return response
          .status(200)
          .send({message:{sucess:'Província inserida com sucesso.'}})

    }
    catch (err) {
      return response
      .status(400)
      .send({message:{err:err},provincia:null});
    }

  
  
  }
   
  
 async listar({request,auth,response}){
  try{
          const provincias = await db.select('id','designacao')
          .from('provincias')
          .orderBy('designacao');
          
          return response
          .send({message:{sucess:true},error: null, data: provincias});
  }
  catch(err){
    return response
    .send({message:{sucess:true}, error: `Falha ao listar dados: ${err}`, data: null});
  }
}

}





module.exports = ProvinciaController
