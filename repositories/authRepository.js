
const {models}=require('../model/index');


class AuthRepository{

    async CreateUser(data){
     try {
       
      
        const user = await models.User.create(data)
        
        return user
        
     } catch (error) {
        throw error

     }
    }

    async findById(userId){
        return models.User.findByPk(userId)
    }

    async findByIdandUpdate(userId,updateData){
        try {

            const user = await models.User.findByPk(userId)

            if(!user){
                throw new Error(`User with ${userId} is not found`)
            }

            await user.update(updateData)
            await user.reload

            return user
            
        } catch (error) {
            throw error
        }

    }

    async countDocuments(filter={}){
        try {
            const count = await models.User.count({where:filter})
            return count
            
        } catch (error) {
            console.error("Error counting users", error);
            throw error;
        }
    }

    async findAllUsers(filter={},options={}){
        try {
            const users = await models.User.findAll({where:filter,...options})
            return users
            
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    }

    async findByPhoneNumber(phoneNumber){
        try {
            const user = await models.User.findOne({where:{phoneNumber}})
            return user
        } catch (error) {
            console.error(`Error fetching user by Phone Number`,error)
            throw error
        }
    }

    async updateUser(userId,updateData){
        try {

            const user = await models.User.findByPk(userId)
             await user.update(updateData)
             await user.reload()
            
            

            return user

        } catch (error) {
            console.error(`Error updating user`,error)
            throw error
        }
    }

    async getUserById(userId){
        try {
            const user = await models.User.findByPk(userId)

            return user
        } catch (error) {
            console.error(`Error in finding user`,error)
            throw error
        }
    }


    async disableUser(userId){
        try {
            const user = await models.User.findByPk(userId)
            await user.update({disabled:true})
            await user.reload()
            return user
        } catch (error) {
            console.error(`Error in disabling user,error`)
            throw error
        }
    }

    async addDemographicData(user_id,booth_id,panchayat_id){
        try {
            const user = await models.User.findByPk(user_id)
            await user.update({booth_id:booth_id,gaon_panchayat_id:panchayat_id})
            await user.reload()
            return user
        } catch (error) {
            console.error(`Error in adding demographic data user,error`)
            throw error
        }
    }


   



}

module.exports = new AuthRepository()