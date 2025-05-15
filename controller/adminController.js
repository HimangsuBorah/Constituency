const adminService = require('../service/adminService')

const getUserByBoothId = async(req,res)=>{
    try {
        const booth_id=req.params.boothid
        const users = await adminService.getUsersByBoothId(booth_id)
        return res.status(200).json({
            success:true,
            users,
            message:"users fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getNonVerifiedHouseholdByUserId = async(req,res)=>{
    try {
        const user_id = req.params.userid
        
        const households = await adminService.getNonVerifiedHouseholdsByUserid(user_id)
        return res.status(200).json({
            success:true,
            households,
            message:"Households fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getVerifiedHouseholdByUserId = async(req,res)=>{
    try {
        const user_id = req.params.id
        const households = await adminService.getVerifiedHouseholdsByUserid(user_id)
        return res.status(200).json({
            success:true,
            households,
            message:"Households fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updateMemberController = async(req,res)=>{
    try {
        const member_id = req.params.id
        const data = req.body
        const updatedmember = await adminService.updateMemberDetails(member_id,data)
        return res.status(200).json({
            success:true,
            updatedmember,
            message:"Member updated successfully"
        }) 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const verifyMemberBYHousehold = async(req,res)=>{
    try {
        const verifiedby = req.user.id
        const headid= req.params.id
        const verifiedmembers = await adminService.verifyMemberBYHouseHold(headid,verifiedby)
        return res.status(200).json({
            success:true,
            verifiedmembers,
            message:"Member verified successfully"
        }) 
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllHouseholdDetailsController = async(req,res)=>{
    try {
        const {page,pageSize}=req.body
        const {members,remaining} = await adminService.getAllhouseholddetails(page,pageSize)
        return res.status(200).json({
            success:true,
            members,
            remaining,
            message:"Household details fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteMemberById = async(req,res)=>{
    try {
       const memberid=req.params.id
       const deletedmember = await adminService.deleteMemberById(memberid)
       return res.status(200).json({
        success:true,
        deletedmember,
        message:"Member deleted successfully"
       }) 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteHouseholdByHeadid = async(req,res)=>{
    try {
        const headid=req.params.id
      
        const deletedmember = await adminService.deleteHouseholdBYhead(headid)
        console.log(deletedmember)
        return res.status(200).json({
         success:true,
         deletedmember,
         message:"Household deleted successfully"
        }) 
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const totalVerifiedProjectsByUser = async(req,res)=>{
    try {
        const userid=req.user.id
        const projectscount = await adminService.getTotalVerfiedProjectsByUser(userid)
        return res.status(200).json({
            success:true,
            projectscount,
            message:"Count fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const totalVerifiedMembersByUser = async(req,res)=>{
    try {
        const userid = req.user.id
        const membercount = await adminService.getTotalVerifiedMembersByUserCount(userid)
        return res.status(200).json({
            success:true,
            membercount,
            message:"Count fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllVerifiedProjectsByCategory = async(req,res)=>{
    try {
        const {page,pageSize}=req.body
        const categoryid=req.params.id

        const {projects,remaining}= await adminService.getVerifiedDevelopementProjectsByCategory(categoryid,page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            projects,
            message:"Verified projects fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllNotVerifiedProjectsByCategory = async(req,res)=>{
    try {
        const {page,pageSize}=req.body
        const categoryid=req.params.id

        const {projects,remaining}= await adminService.getNotVerifiedDevelopementProjectsByCategory(categoryid,page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            projects,
            message:"Not Verified projects fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const totalVerifiedDevelopementProjects = async(req,res)=>{
    try {
        const {page,pageSize}=req.body
        const {projects,remaining}= await adminService.getTotalVerifiedDevelopementProjects(page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            projects,
            message:"All Verified projects fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const totalNotVerifiedDevelopementProjects =async(req,res)=>{
    try {
        const {page,pageSize}=req.body
        const {projects,remaining}= await adminService.getTotalNotVerifiedDevelopementProjects(page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            projects,
            message:"All Not Verified projects fetched successfully"
        }) 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updateProjectDetails = async(req,res)=>{
    try {
        const developementid=req.params.id
        const updateData = req.body
        const project = await adminService.updateProjectDetails(developementid,updateData)
        return res.status(200).json({
            success:true,
            project,
            message:"Project details updated"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const verifyProject = async(req,res)=>{
    try {
        const developementid = req.params.id
        const userid=req.user.id
        const project = await adminService.verifyProjectById(developementid,userid)
        return res.status(200).json({
            success:true,
            project,
            message:"Project details verified"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteProjectByIdController = async(req,res)=>{
    try {
        const developementid = req.params.id
        const project = await adminService.deleteProject(developementid)
        return  res.status(200).json({
            success:true,
            project,
            message:"Project deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getProjectById = async(req,res)=>{
    try {
        const developementid = req.params.id
        const project = await adminService.getProjectById(developementid)
        return res.status(200).json({
            success:true,
            project,
            message:"Project fetched successfully"
        }) 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const getAllNotVerifiedAssetsByUser = async(req,res)=>{
    try {
      
        const {page,pageSize}=req.body
        const {assets,remaining}= await adminService.getAllNotverifiedAssetsByUser(page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            assets,
            message:"Assets fetched successfully"
        }) 
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllVerifiedAssetsByUser = async(req,res)=>{
    try {
       
        const {page,pageSize}=req.body
        const {assets,remaining}= await adminService.getAllverifiedAssetsByUser(page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            assets,
            message:"Assets fetched successfully"
        }) 
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteAssetByIdController = async(req,res)=>{
    try {
        const assetid = req.params.id
        const asset = await adminService.deleteAssetByid(assetid)
        return res.status(200).json({
            success:true,
            asset,
            message:"Asset deleted successfully"
        }) 

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updateAssetDetailsController = async(req,res)=>{
    try {
        const assetid=req.params.id
        const updateData = req.body
        const asset = await adminService.updateAssetdetails(assetid,updateData)
        return res.status(200).json({
            success:true,
            asset,
            message:"Asset updated successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const verifyAssetDetailsController = async(req,res)=>{
    try {
        const assetid=req.params.id
        const userid=req.user.id
        const asset = await adminService.verifyAssetById(assetid,userid)
        return res.status(200).json({
            success:true,
            asset,
            message:"Asset verified successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllCategories = async(req,res)=>{
  try {
  
    const categories = await adminService.getAllCategories()
    return res.status(200).json({
      success:true,
      categories,
      message:"Categories fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllCommunityGroups = async(req,res)=>{
    try {
        const status = req.body.is_verified
        const {page,pageSize}=req.body

        const {community_groups,remaining} = await adminService.getAllCommunityGroupsByStatus(status,page,pageSize)
        return res.status(200).json({
            success:true,
            remaining,
            community_groups,
            message:"Groups fetched successfully"
          })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const verifyCommunityGroup = async(req,res)=>{
    try {
        const userid=req.user.id
        const leaderid = req.params.id
        const verified_group = await adminService.verifyCommunityGroups(leaderid,userid)
        return res.status(200).json({
            success:true,
            verified_group,
            message:"Group verified successfully"
          })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateCommunityMemberDetails = async(req,res)=>{
    try {
        const memberid = req.params.id
        const updateData = req.body

        const updated_group = await adminService.editCommunityGroupDetails(memberid,updateData)
        return res.status(200).json({
            success:true,
            updated_group,
            message:"Group updated successfully"
          })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteCommunityGroupMembers = async(req,res)=>{
    try {
        const memberid = req.params.id

        const deleted_group = await adminService.deleteCommunityGroup(memberid)
        return res.status(200).json({
            success:true,
            deleted_group,
            message:"Group updated successfully"
          })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const userleaderBoard = async(req,res)=>{
    try {
        const leaderboard = await adminService.userLeaderboard()
        return res.status(200).json({
            leaderboard,
            message:"Leaderboard fetched successfully"
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports = {getUserByBoothId,getVerifiedHouseholdByUserId,getNonVerifiedHouseholdByUserId,updateMemberController,verifyMemberBYHousehold,getAllHouseholdDetailsController,deleteMemberById,deleteHouseholdByHeadid,totalVerifiedProjectsByUser,totalVerifiedMembersByUser,
    getAllVerifiedProjectsByCategory,getAllNotVerifiedProjectsByCategory,totalVerifiedDevelopementProjects,totalNotVerifiedDevelopementProjects,updateProjectDetails,verifyProject,deleteProjectByIdController,getProjectById,getAllVerifiedAssetsByUser,getAllNotVerifiedAssetsByUser,
    deleteAssetByIdController,updateAssetDetailsController,verifyAssetDetailsController,getAllCategories,getAllCommunityGroups,verifyCommunityGroup,updateCommunityMemberDetails,deleteCommunityGroupMembers,userleaderBoard
}