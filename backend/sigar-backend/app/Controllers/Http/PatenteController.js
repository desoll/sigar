'use strict'
const Patente = use('App/Models/Patente');
class PatenteController {

 async criar({request,auth,response}){
 try{
        const dados = request.only(['designacao'])
        const patenteDesignacao = await Patente.findBy('designacao', dados.designacao);
        console.log(patenteDesignacao) 

        if(patenteDesignacao != null){
          console.log(patenteDesignacao)
          return response
          .status(400)
          .send({message:{error:'patente já existênte'}});

        }

         const patente = await Patente.create(dados);
         return response
         .status(200)
         .send({message:{sucess:'Patente inserida com sucesso.'}})
     
  }
  catch(err){
      
    return response
    .status(400)
    .send({message:{err:err},patente:null});
  }

 }

 async index(request,auth,response){
   console.log("ok");
 }

}

module.exports = PatenteController
