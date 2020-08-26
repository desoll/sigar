'use strict'

const Provincia = use('App/Models/Provincia');
const db = use('Database');

class ProvinciaController {
  
  
 async listar({request,auth,response}){
  try{
          const provincias = await db.raw('select id, INITCAP(designacao) as designacao ' 
          +' from provincias order by designacao asc');
          return response
          .status(200)
          .send({message:{sucess:true},error: null, data: provincias[0]});
  }
  catch(err){
    return response
    .status(400)
    .send({message:{sucess:true}, error: `Falha ao listar dados: ${err}`, data: null});
  }
}

}





module.exports = ProvinciaController
