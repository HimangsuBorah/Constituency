const { models } = require("../model/index");
const houseDataRepository = require("./housedataRepository");
const { deleteImageFromBunny } = require("../utils/bunnyUploader");

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
          entered_by: userid,
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
          entered_by: userid,
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

  async getAllNotVerifiedAssetsByUser(userid, page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Assets.findAndCountAll({
        where: {
          user_id: userid,
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

  async getAllVerifiedAssetsByUser(userid, page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await models.Assets.findAndCountAll({
        where: {
          user_id: userid,
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

      if (asset.assetImages && asset.assetImages.length > 0) {
        await Promise.all(
          asset.assetImages.map(async (img, index) => {
            if (!img.img_url) {
              console.warn(`Skipping image ${index}, no URL`);
              return;
            }

            const filePath = img.img_url.replace(
              process.env.BUNNY_CDN_URL + "/",
              ""
            );

            console.log("Deleting file:", filePath);

            await deleteImageFromBunny(filePath);
          })
        );

        // Step 2: Delete SubmissionImage entries from DB
        await models.AssetsImage.destroy({
          where: { asset_id: assetid },
        });
      }

      // Step 3: Delete the Submission itself
      await models.Assets.destroy({
        where: { id: assetid },
      });

      return deletedAsset;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AdminRepository();
