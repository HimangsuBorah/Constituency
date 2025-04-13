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
                    is_verified:false
                
                },
                include:[{
                    model:models.Member,
                    as:'familyMembers',
                    where:{
                        is_head:false,
                        is_verified:false
                    }
                }]
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
                    is_verified:true
                
                },
                include:[{
                    model:models.Member,
                    as:'familyMembers',
                    where:{
                        is_head:false,
                        is_verified:true
                    }
                }]
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
            const members = await models.Member.findAll({
                where: {
                  id: headid
                },
                include: [
                  {
                    model: models.Member,
                    as: 'familyMembers',
                    where: {
                      is_head: false
                    },
                    required: false // allow head even if no family members
                  }
                ]
              });
              
              if (members.length === 0) {
                throw new Error("Members not found or invalid head member ID");
              }
              
              const updated = await Promise.all(
                members.map(async (m) => {
                  // Update head
                  await m.update({ is_verified: true });
              
                  // Update each family member
                  if (Array.isArray(m.familyMembers)) {
                    await Promise.all(
                      m.familyMembers.map(async (fm) => {
                        await fm.update({ is_verified: true });
                      })
                    );
                  }
              
                  return m;
                })
              );
              
              return updated;
        } catch (error) {
            throw error
        }

    }

}

module.exports =  new AdminRepository()