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
        const deletedmember = await adminService.deleteMemberById(headid)
        return res.status(200).json({
         success:true,
         deletedmember,
         message:"Household deleted successfully"
        }) 
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports = {getUserByBoothId,getVerifiedHouseholdByUserId,getNonVerifiedHouseholdByUserId,updateMemberController,verifyMemberBYHousehold,getAllHouseholdDetailsController,deleteMemberById,deleteHouseholdByHeadid}