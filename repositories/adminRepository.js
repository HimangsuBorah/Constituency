const {models}=require('../model/index');
const houseDataRepository=require('./housedataRepository')

class AdminRepository{

    async getUsersByBoothId(boothid){
        try {
            const users = await models.User.findAll({
                where:{
                    booth_id:boothid
                }
            })
            if(!users) throw new Error("No user exists for the given booth")
            return users
        } catch (error) {
            throw error
        }
    }

    async getNonVerifiedHouseholdsByUserid(userid){
        try {
            const households = await models.Member.findAll({
                where:{
                    entered_by:userid,
                    is_head:true,
                    is_verfied:false
                
                }
            })
            return households
        } catch (error) {
            throw error
        }
    }

    async getVerifiedHouseholdsByUserid(userid){
        try {
            const households = await models.Member.findAll({
                where:{
                    entered_by:userid,
                    is_head:true,
                    is_verfied:true
                
                }
            })
            return households
        } catch (error) {
            throw error
        }
    }

    async updateMemberDetails(memberid,updateData){
        try {
            const member = await models.Member.findByPk(memberid)
            await member.update(updateData)
            await member.reload()
            return member
        } catch (error) {
            throw error
        }
    }

    

    async verifyMemberByHousehold(headid){
        try {
            const members = await houseDataRepository.getFamilyBYHeadid(headid)
            if(!members.length) throw new Error("members not found")
            
            const updated = await Promise.all(
                members.map((m)=>{
                    m.update({is_verfied:true},{returning:true})
                })
            )
            return updated
        } catch (error) {
            throw error
        }

    }

}

module.exports =  new AdminRepository()