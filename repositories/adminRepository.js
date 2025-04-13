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

    

    async verifyMemberByHousehold(headid,verifiedby){
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
                  await m.update({ is_verified: true,verified_by:verifiedby });
              
                  // Update each family member
                  if (Array.isArray(m.familyMembers)) {
                    await Promise.all(
                      m.familyMembers.map(async (fm) => {
                        await fm.update({ is_verified: true,verified_by:verifiedby });
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


    async getAllHouseholdDetails(page,pageSize){
        try {

            const offset = (page-1)*pageSize
            const {rows,count} = await models.Member.findAndCountAll({
                where:{
                    is_head:true
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
                ],
                offset:offset,
                limit:pageSize

            })
            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
            return {members:rows,remaining}
            
        } catch (error) {
            throw error
        }
    }


    async deleteMemberById(memberid){
        try {
            const member = await models.Member.findByPk(memberid)
            if(!member){
                throw new Error("Member does not exists")
            }
            if(member.is_head){
               throw new Error("Head cannot be deleted") 
            }
            const deletedMember = member
            await member.destroy()
            return deletedMember
        } catch (error) {
            throw error
        }
    }

    async deleteHouseholdByHeadid(headid){
        try {
            const member = await models.Member.findByPk({
                where:{
                    id:headid
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
                ],
            })
            if(!member){
                throw new Error("Member does not exists")
            }
            if(!member.is_head){
                throw new Error("Cannot delete the household by member id")
            }
            const deletedMember = member
            await member.destroy()
            return deletedMember
        } catch (error) {
            throw error
        }
    }

}

module.exports =  new AdminRepository()