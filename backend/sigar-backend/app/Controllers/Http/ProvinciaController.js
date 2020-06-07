'use strict'

const Provincia = use('App/Models/Provincia');
const db = use('Database');

class ProvinciaController {
  
  
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
