const authRepository = require('../repositories/userRepository')
const bcrypt = require('bcrypt')

class UserService{

    async registerData(data){
        try {
            
            
            
            
          
            
           

            const user = await authRepository.CreateUser(data)
            

            return user


        } catch (error) {
            throw new Error(`Error in register service: ${error.message}`);

        }
    }

}


module.exports = new UserService()