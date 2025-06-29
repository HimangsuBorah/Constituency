const { models } = require("../model/index");
const houseDataRepository = require("./housedataRepository");
const { deleteImageFromBunny } = require("../utils/bunnyUploader");
const { Op } = require('sequelize'); 


class AdminRepository {
  async getUsersByBoothId(boothid) {
    try {
      const users = await models.User.findAll({
        where: {
          booth_id: boothid,
        },
      });
      if (!users) throw new Error("No user exists for the given booth");
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getNonVerifiedHouseholdsByUserid(userid) {
    try {
      const households = await models.Member.findAll({
        where: {
          user_id: userid,
          is_head: true,
          is_verified: false,
        },
        include: [
          {
            model: models.Member,
            as: "familyMembers",
            where: {
              is_head: false,
              is_verified: false,
            },
            required: false,
            include: [
              {
                model: models.Schemes, // 👈 Include schemes for each family member
                through: {
                  attributes: [], // hide pivot table fields
                },
              },
            ],
          },
          {
            model: models.Schemes, // 👈 Include schemes for head of household
            through: {
              attributes: [],
            },
          },
        ],
      });

      return households;
    } catch (error) {
      throw error;
    }
  }

  async getVerifiedHouseholdsByUserid(userid) {
    try {
      const households = await models.Member.findAll({
        where: {
          user_id: userid,
          is_head: true,
          is_verified: true,
        },
        include: [
            {
              model: models.Member,
              as: "familyMembers",
              where: {
                is_head: false,
                is_verified: true,
              },
              required: false,
              include: [
                {
                  model: models.Schemes, // 👈 Include schemes for each family member
                  through: {
                    attributes: [], // hide pivot table fields
                  },
                },
              ],
            },
            {
              model: models.Schemes, // 👈 Include schemes for head of household
              through: {
                attributes: [],
              },
            },
          ],
      });

      return households;
    } catch (error) {
      throw error;
    }
  }

  async updateMemberDetails(memberid, updateData) {
    try {
      const member = await models.Member.findByPk(memberid);
      await member.update(updateData);
      await member.reload();
      return member;
    } catch (error) {
      throw error;
    }
  }

  async verifyMemberByHousehold(headid, verifiedby) {
    try {
      const members = await models.Member.findAll({
        where: {
          id: headid,
          is_head:true
        },
        include: [
            {
              model: models.Member,
              as: "familyMembers",
              where: {
                is_head: false
              },
              required: false,
              include: [
                {
                  model: models.Schemes, // 👈 Include schemes for each family member
                  through: {
                    attributes: [], // hide pivot table fields
                  },
                },
              ],
            },
            {
              model: models.Schemes, // 👈 Include schemes for head of household
              through: {
                attributes: [],
              },
            },
          ],
      });

      if (members.length === 0) {
        throw new Error("Members not found or invalid head member ID");
      }

      const updated = await Promise.all(
        members.map(async (m) => {
          // Update head
          await m.update({ is_verified: true, verified_by: verifiedby });

          // Update each family member
          if (Array.isArray(m.familyMembers)) {
            await Promise.all(
              m.familyMembers.map(async (fm) => {
                await fm.update({ is_verified: true, verified_by: verifiedby });
              })
            );
          }

          return m;
        })
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async getAllHouseholdDetails(page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Member.findAndCountAll({
        where: {
          is_head: true,
        },
        include: [
            {
              model: models.Member,
              as: "familyMembers",
              where: {
                is_head: false
              },
              required: false,
              include: [
                {
                  model: models.Schemes, // 👈 Include schemes for each family member
                  through: {
                    attributes: [], // hide pivot table fields
                  },
                },
              ],
            },
            {
              model: models.Schemes, // 👈 Include schemes for head of household
              through: {
                attributes: [],
              },
            },
          ],
        offset: offset,
        limit: pageSize,
      });
      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { members: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async deleteMemberById(memberid) {
    try {
      const member = await models.Member.findByPk(memberid);
      if (!member) {
        throw new Error("Member does not exists");
      }
      if (member.is_head) {
        throw new Error("Head cannot be deleted");
      }
      const deletedMember = member;
      await member.destroy();
      return deletedMember;
    } catch (error) {
      throw error;
    }
  }

  async deleteHouseholdByHeadid(headid) {
    try {
      const member = await models.Member.findOne({
        where: { id: headid, is_head: true },
        include: [{ model: models.Member, as: "familyMembers" }],
      });

      if (!member) {
        throw new Error("Member does not exists");
      }
      if (!member.is_head) {
        throw new Error("Cannot delete the household by member id");
      }
      const deletedMember = member;
      try {
        await member.destroy({ individualHooks: true });
      } catch (error) {
        console.error("❌ DB Error:", error.original || error);
        throw error;
      }
      return deletedMember;
    } catch (error) {
      throw error;
    }
  }

  async getVerifiedDevelopementProjectsBYCategory(categoryid, page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Developement.findAndCountAll({
        where: {
          is_verified: true,
          category_id: categoryid,
        },
        include: [
          {
            model: models.DevelopementImage,
            as: "images",
            required: false, // allow head even if no family members
          },
        ],
        offset: offset,
        limit: pageSize,
      });

      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { projects: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async getNotVerifiedDevelopementProjectsByCategory(
    categoryid,
    page,
    pageSize
  ) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Developement.findAndCountAll({
        where: {
          category_id: categoryid,
          is_verified: false,
        },
        include: [
          {
            model: models.DevelopementImage,
            as: "images",
            required: false, // allow head even if no family members
          },
        ],
        offset: offset,
        limit: pageSize,
      });

      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { projects: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async getTotalVerifiedProjectsByUserCount(userid) {
    try {
      const verifiedProjects = await models.Developement.count({
        where: {
          is_verified: true,
          verified_by: userid,
        },
      });
      return verifiedProjects;
    } catch (error) {
      throw error;
    }
  }

  async totalMembersVerifiedByUserCount(userid) {
    try {
      const membercount = await models.Member.count({
        where: {
          is_verified: true,
          verified_by: userid,
        },
      });
      return membercount;
    } catch (error) {
      throw error;
    }
  }

  async getTotalVerifiedDevelopementProject(page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Developement.findAndCountAll({
        where: {
          is_verified: true,
        },
        include: [
          {
            model: models.DevelopementImage,
            as: "images",
            required: false, // allow head even if no family members
          },
        ],
        offset: offset,
        limit: pageSize,
      });
      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { projects: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async getTotalNotVerifiedDevelopementProject(page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Developement.findAndCountAll({
        where: {
          is_verified: false,
        },
        include: [
          {
            model: models.DevelopementImage,
            as: "images",
            required: false, // allow head even if no family members
          },
        ],
        offset: offset,
        limit: pageSize,
      });
      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { projects: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async getTotalNotVerifiedDevelopementProject(page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Developement.findAndCountAll({
        where: {
          is_verified: false,
        },
        include: [
          {
            model: models.DevelopementImage,
            as: "images",
            required: false, // allow head even if no family members
          },
        ],
        offset: offset,
        limit: pageSize,
      });
      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { projects: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async updateProjectDetails(developementid, updateData) {
    try {
      const project = await models.Developement.findByPk(developementid);
      if (!project) {
        throw new Error("Project not found");
      }

      await project.update(updateData);
      await project.reload();
      return project;
    } catch (error) {
      throw error;
    }
  }

  async verifyProject(developementid, userid) {
    try {
      const project = await models.Developement.findByPk(developementid);
      if (!project) {
        throw new Error("Projects not found");
      }

      await project.update({ is_verified: true, verified_by: userid });
      await project.reload();
      return project;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(developementid) {
    try {
      const project = await models.Developement.findByPk(developementid);
      if (!project) {
        throw new Error("Project does not exists");
      }
      const deletedproject = project;
      await project.destroy();
      return deletedproject;
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(developementid) {
    try {
      console.log(developementid);
      const project = await models.Developement.findAll({
        where: {
          id: developementid,
        },
        include: [
          {
            model: models.DevelopementImage,
            as: "images",
            required: false, // allow head even if no family members
          },
        ],
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async deleteCommunityGroupsByLeaderId(leaderid) {
    try {
      const group = await models.CommunityGroups.findOne({
        where: {
          id: leaderid,
        },
        include: [
          {
            model: models.CommunityGroups,
            as: "group_members",
            required: false, // allow head even if no family members
          },
        ],
      });

      if (!group) {
        throw new Error("Group does not exists");
      }

      if (!group.is_leader) {
        throw new Error("Cannot delete a group by member");
      }
      const deletedgroup = group;
      try {
        await group.destroy({ individualHooks: true });
      } catch (error) {
        console.error("❌ DB Error:", error.original || error);
        throw error;
      }
      return deletedgroup;
    } catch (error) {
      throw error;
    }
  }

  async deletegroupmemberbyId(memberid) {
    try {
      const groupmember = await models.CommunityGroups.findOne({
        where: {
          id: memberid,
          is_leader: false,
        },
      });
      const deletedmember = groupmember;
      try {
        await groupmember.destroy();
      } catch (error) {
        console.error("❌ DB Error:", error.original || error);
        throw error;
      }

      return deletedmember;
    } catch (error) {
      throw error;
    }
  }

  async getAllNotVerifiedAssetsByUser( page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Assets.findAndCountAll({
        where: {
          
          is_verified: false,
        },
        include: [
          {
            model: models.AssetsImage,
            as: "assetImages",
            required: false, // allow head even if no family members
          },
          {
            model: models.AssetType,
            as: "assetType",
            required: false, // allow head even if no family members
          },
        ],
        

        offset: offset,
        limit: pageSize,
      });
      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { assets: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async getAllVerifiedAssetsByUser( page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Assets.findAndCountAll({
        where: {
          is_verified: true,
        },
        include: [
            {
                model: models.AssetsImage,
                as: "assetImages",
                required: false, // allow head even if no family members
              },
              {
                model: models.AssetType,
                as: "assetType",
                required: false, // allow head even if no family members
              },
        ],
        
        offset: offset,
        limit: pageSize,
      });
      let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
      return { assets: rows, remaining };
    } catch (error) {
      throw error;
    }
  }

  async verifyAssetsById(assetid, userid) {
    try {
      const asset = await models.Assets.findByPk(assetid);
      if (!asset) {
        throw new Error("Asset does not exists");
      }

      await asset.update({ is_verified: true, verified_by: userid });
      await asset.reload();
      return asset;
    } catch (error) {
      throw error;
    }
  }

  async updateAssetDetails(assetid, updateData) {
    try {
      const asset = await models.Assets.findByPk(assetid);
      if (!asset) {
        throw new Error("Asset does not exists");
      }

      await asset.update(updateData);
      await asset.reload();
      return asset;
    } catch (error) {
      throw error;
    }
  }

  async deleteAssetById(assetid) {
    try {
      const asset = await models.Assets.findOne({
        where: {
          id: assetid,
        },
        include: [
          {
            model: models.AssetsImage,
            as: "assetImages",
            required: false, // allow head even if no family members
          },
        ],
      });
      if (!asset) {
        throw new Error("Asset does not exist");
      }

      const deletedAsset = asset;

      // if (asset.assetImages && asset.assetImages.length > 0) {
      //   await Promise.all(
      //     asset.assetImages.map(async (img, index) => {
      //       if (!img.img_url) {
      //         console.warn(`Skipping image ${index}, no URL`);
      //         return;
      //       }

      //       const filePath = img.img_url.replace(
      //         process.env.BUNNY_CDN_URL + "/asset",
      //         ""
      //       );

      //       console.log("Deleting file:", filePath);

            
      //       try{
      //         await deleteImageFromBunny(filePath)
      //       }catch(error){
      //         console.log(error)
      //         throw error
      //       }
            
      //     })
      //   );

      //   // Step 2: Delete SubmissionImage entries from DB
      //   await models.AssetsImage.destroy({
      //     where: { asset_id: assetid },
      //   });
      // }

      // Step 3: Delete the Submission itself
      await models.Assets.destroy({
        where: { id: assetid },
      });

      return deletedAsset;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories(){
    try {
        const categories = await models.Category.findAll()
        return categories
    } catch (error) {
        throw error
    }
}

async getAllUserCount(){
  try {
      const users = await models.User.findAll()
      return users
  } catch (error) {
      throw error
  }
}


async getAllCommunityGroupsByStatus(status,page,pageSize){
  try {

    const offset = (page - 1) * pageSize;
    const {rows,count} = await models.CommunityGroups.findAndCountAll({
      where:{
        is_verified:status
      },
      include:[
        {
          model: models.CommunityGroups,
          as:'group_members'
        },
        {
          model: models.CommunityGroupCategory,
          as:'community_category'
        }
      ],
      offset: offset,
      limit: pageSize,
    })

    let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
    return { community_groups: rows, remaining };
  } catch (error) {
      throw error
  }
}

async verifyCommunityGroups(leaderid,userid){
  try {
    const community_group = await models.CommunityGroups.findAll({
      where:{
        id:leaderid,
        is_leader:true
      },
      include:[
        {
          model: models.CommunityGroups,
          as:'group_members',
          required: false
        }
      ],
    })

    if (community_group.length === 0) {
      throw new Error("Members not found or invalid Leader ID");
    }

    const updated = await Promise.all(
      community_group.map(async (m) => {
        // Update head
        await m.update({ is_verified: true, verified_by: userid });

        // Update each family member
        if (Array.isArray(m.group_members)) {
          await Promise.all(
            m.group_members.map(async (fm) => {
              await fm.update({ is_verified: true, verified_by: userid });
            })
          );
        }

        return m;
      })
    )

    return updated;
   

  } catch (error) {
    throw error
  }
}

async editCommunityGroupDetails(memberid,updateData){
  try {
    const community_group = await models.CommunityGroups.findByPk(memberid)
    if(!memberid){
      throw new Error("Member does not exists")
    }
    await community_group.update(updateData)
    await community_group.reload()
    return community_group
  } catch (error) {
    throw error
  }
}

async deleteCommunityMember(memberid){
  try {
    const community_group = await models.CommunityGroups.findOne({
      where:{
        id:memberid
      },
      include:[
        {
          model: models.CommunityGroups,
          as:'group_members',
          required: false
        }
      ]
    })
    if(!community_group){
      throw new Error("Member does not exists")
    }

    if( community_group.is_leader && community_group.length.group_members !==0){
      throw new Error("First delete the members")
    }

   

    const deletedCommunityGroups = community_group
    await community_group.destroy()
    return deletedCommunityGroups
  } catch (error) {
    throw error
  }
}

async userleaderboard(){
  try {
    const users = await models.User.findAll({
      where: { role: { [Op.ne]: 'admin' } },
      attributes:['id','name','role']
    })
    
    const leaderboard = await Promise.all(
      users.map(async(user)=>{
        const [memberCount,developementCount,assetCount,communitygroupsCount,beneficiariesCount,importantpersonsCount] = await Promise.all([
          models.Member.count({where:{user_id:user.id,is_verified:true}}),
          models.Developement.count({where:{user_id:user.id,is_verified:true}}),
          models.Assets.count({where:{user_id:user.id,is_verified:true}}),
          models.CommunityGroups.count({where:{user_id:user.id,is_verified:true}}),
          models.Benificary.count({where:{user_id:user.id,is_verified:true}}),
          models.ImportantPerson.count({where:{user_id:user.id,is_verified:true}})
        ])

        return {
          user_id: user.id,
          name: user.name,
          role:user.role,
          count: {
            memberCount,developementCount,assetCount,communitygroupsCount,beneficiariesCount,importantpersonsCount
          }
        };
      })
    )

    return leaderboard
  } catch (error) {
    throw error
  }
}


async getDashboardCountAdmin(){
  try {
      const [userCount,memberCount,developementCount,assetCount,communitygroupsCount,beneficiariesCount,importantpersonsCount] = await Promise.all([
          models.User.count({where:{is_verified:true}}),
          models.Member.count({where:{is_verified:true}}),
          models.Developement.count({where:{is_verified:true}}),
          models.Assets.count({where:{is_verified:true}}),
          models.CommunityGroups.count(),
          models.Benificary.count(),
          models.ImportantPerson.count()
        ])

        return {
          counts:{
            userCount,
            memberCount,
            developementCount,
            assetCount,
            communitygroupsCount,
            beneficiariesCount,
            importantpersonsCount
          }
        }
  } catch (error) {
      throw error
  }
}


}

module.exports = new AdminRepository();
