const adminRepository= require('../repositories/adminRepository')

class AdminService{

    async getUsersByBoothId(boothid){
        try {
            const users = await adminRepository.getUsersByBoothId(boothid)
            return users
        } catch (error) {
            throw error
        }
    }

    async getNonVerifiedHouseholdsByUserid(userid){
        try {
            const members = await adminRepository.getHouseholdsByUserid(userid)
            return members
        } catch (error) {
            throw error
        }
    }

    async getVerifiedHouseholdsByUserid(userid){
        try {
            const members = await adminRepository.getHouseholdsByUserid(userid)
            return members
        } catch (error) {
            throw error
        }
    }

    async updateMemberDetails(memberid,updateData){
        try {
            const updatedmember= await adminRepository.updateMemberDetails(memberid,updateData)
            return updatedmember
        } catch (error) {
            throw error
        }
    }

    async verifyMemberBYHouseHold(headid){
        try {
            const updated = await adminRepository.verifyMemberByHousehold(headid)
            return updated
        } catch (error) {
            throw error
        }
    }


   

}

module.exports = new AdminService()