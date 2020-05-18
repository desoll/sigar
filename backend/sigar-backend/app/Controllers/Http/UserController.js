'use strict'
const Hash=use('Hash');
const User =use('App/Models/User');

class UserController {


    async store({request,auth,response}){

       try{
            //GET THE FIELDS WE NEED FROM REQUEST
        const data=request.only(['username','email','password']);
        //CONFIRM IF ALREADY EXISTS
        const userEmail = await User.findByOrFail('email',data.email);
        const userName = await User.findByOrFail('username',data.username);
        if(userEmail.username !=null || userName.username){
            return response
            .status(400)
            .send({message:{error:'Email ou username já existe!'}});
        }
        const user = await User.create(data);
        return response
        .status(200)
        .send({message:{success:'Usuário criado com sucesso'},user:user});


       }
       catch(err){

        return response
        .status(400)
        .send({message:{err:err},user:null});

       }

    }

    async login({request,auth,response}){

      try{
          //GET THE FIELDS WE NEED FROM REQUEST
        const {email,password} =request.only(['email','password']);
        //GET USER BY EMAIL FROM USER TABLE
        const user =await User.findByOrFail('email',email);
        if(user.username!=null){

            //NOW LET'S COMPARE THE PASSWORDS
            const isPasswordEquals = await Hash.verify(password,user.password);
            if(isPasswordEquals){

                //WE THEN GENERATE THE USER TOKEN
                const token = await auth.generate(user);

                //AND SAVE TOKEN IN THE DATABASE
                user.token =token.token;
                user.token_created_at=Date();
                user.save();

                return response
                .status(200)
                .send({message:{success:'Usuário autorizado',},user:user,token:token});

            }
            else{
                return response
                .status(400)
                .send({message:{error:'Usuário não autorizado',},data:null})
            }

        }
        else{
            return response
            .status(400)
            .send({message:{error:'Usuário não encontrado',},data:null})
        }



        

      }
      catch(err){
          return response
          .status(400)
          .send({message:{error:err}});
      }

    }

}

module.exports = UserController
