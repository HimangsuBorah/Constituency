const authRepository = require('../repositories/authRepository')
const bcrypt = require('bcrypt')
const {generateAccessTokens,generateRefreshTokens}=require('../utils/tokenUtils')
const jwt = require('jsonwebtoken')
const e = require('express')


class AuthService{


    async registerData(data){
        try {
            
            const {password,phoneNumber,role,name,is_active,approval_status,booth_id,gaon_panchayat_id,village_id}=data
            
            
          
            
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await authRepository.CreateUser({password:hashedPassword,phoneNumber,role,name,is_active,approval_status,booth_id,gaon_panchayat_id,village_id})
            

            return user


        } catch (error) {
            throw new Error(`Error in register service: ${error.message}`);

        }
    }


    async login(phoneNumber,password){
        try {
            
            if(!phoneNumber || !password){
                throw new Error("PhoneNumber and password is required")
            }

            const user = await authRepository.findByPhoneNumber(phoneNumber)
            if(user.disabled){
                throw new Error("User is disabled")
            }
            
            if(!user){
                throw new Error("User is not registered")
            }

            

            const valid = await bcrypt.compare(password,user.password)
            

            if(!valid){
                throw new Error("Invalid credentials")
            }

            const accessToken=generateAccessTokens(user.id);
            const refreshToken=generateRefreshTokens(user.id);



            return {accessToken,refreshToken,user}

        } catch (error) {
            throw new Error(`Error in login service: ${error.message}`);
        }
    }

    

    async refreshtoken(refreshToken){
        try {
  
          const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY)
          console.log(decoded)
          
        const id=decoded.userId
        console.log(id)
         const user = await authRepository.findById(id)
         
         
  
          if(!user){
             throw new Error("User does not exist")
          }
        
  
          const newaccessToken= generateAccessTokens(user.id);
          const newrefreshToken= generateRefreshTokens(user.id);
  
          // console.log(newaccessToken,newrefreshToken)
          
  
  
          return{newaccessToken,newrefreshToken}
          
        } catch (e) {
            console.log("Error in refresh token")
            throw e
        }
    }


    async getUserById(userId){
        try {
            const user = await authRepository.getUserById(userId)
            return user
        } catch (error) {
            console.log("Error in refresh token")
            throw e
        }
    }

    async disableUser(userId){
        try {
            const user = await authRepository.disableUser(userId)
            return user
        } catch (error) {
            console.log("Error in disable user")
            throw e
        }
    }

    async disableUserByForm(phoneNumber,password){
        try {
            const user = await authRepository.findByPhoneNumber(phoneNumber)
            if(!user){
                throw new Error("User not found")
            }

            if(user.disabled){
                throw new Error("User is already disabled")
            }

            const valid = await bcrypt.compare(password,user.password)
            if(!valid){
                throw new Error("Invalid credentials")
            }

            const disabledUser = await authRepository.disableUser(user.id)
            return disabledUser
        } catch (error) {
            console.log("Error in disable user by form")
            throw error
        }
    }

    async addDemographicDataController(user_id,booth_id,panchayat_id){
        try {
            const user = await authRepository.addDemographicData(user_id,booth_id,panchayat_id)
            return user
        } catch (error) {
            console.log("Error in add booth and gaon panchayat to  user by form")
            throw error
        }
    }


   


}

module.exports = new AuthService()
