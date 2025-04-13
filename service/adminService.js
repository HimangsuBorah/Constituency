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
            const members = await adminRepository.getNonVerifiedHouseholdsByUserid(userid)
            return members
        } catch (error) {
            throw error
        }
    }

    async getVerifiedHouseholdsByUserid(userid){
        try {
            const members = await adminRepository.getVerifiedHouseholdsByUserid(userid)
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

    async verifyMemberBYHouseHold(headid,verifiedby){
        try {
            const updated = await adminRepository.verifyMemberByHousehold(headid,verifiedby)
            return updated
        } catch (error) {
            throw error
        }
    }

    async getAllhouseholddetails(page,pageSize){
        try {
           const {members,remaining}= await adminRepository.getAllHouseholdDetails(page,pageSize)
           return {members,remaining}
        } catch (error) {
            throw error
        }
    }

    async deleteMemberById(memberid){
        try {
            const deletedmember = await adminRepository.deleteMemberById(memberid)
            return deletedmember
        } catch (error) {
            throw error
        }
    }

    async deleteHouseholdBYhead(headid){
        try {
            const deletedhousehold = await adminRepository.deleteHouseholdByHeadid(headid)
            return deletedhousehold
        } catch (error) {
            throw error
        }
    }

    async getTotalVerfiedProjectsByUser(userid){
        try {
            const verifiedprojects = await adminRepository.getTotalVerifiedProjectsByUserCount(userid)
            return verifiedprojects
        } catch (error) {
            throw error
        }
    }


   

}

module.exports = new AdminService()