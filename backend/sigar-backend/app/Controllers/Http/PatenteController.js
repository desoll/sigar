'use strict'
const Patente = use('App/Models/Patente');
class PatenteController {

 async criar({request,auth,response}){
   try{
        const dados = request.only(['designacao'])
        const patenteDesignacao = await Patente.findByOrFail('designacao', dados.designacao);
       
        if(patenteDesignacao.designacao != null){

          return response
          .status(400)
          .send({message:{error:'patente já existênte'}});

        }
        
         const patente = await Patente.create(dados);
         return response
         .status(200)
         .send({message:{sucess:'Patente inserida com sucesso.'}})

  }
  catch(error){
      
    return response
    .status(400)
    .send({message:{err:error},patente:null});
  }

 }

 async index(request,auth,response){
   console.log("ok");
 }

}

module.exports = PatenteController
