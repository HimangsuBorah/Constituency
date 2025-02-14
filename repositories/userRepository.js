const User = require('../model/ConstituencyUser')

class UserRepository{
    async CreateUser(data){
        try {
          
         
           const user = await User.create(data)
           
           return user
           
        } catch (error) {
           throw new Error(`Error in user repository: ${error.message}`);
   
        }
       }
}

module.exports = new UserRepository()