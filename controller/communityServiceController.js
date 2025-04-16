const path = require('path')
const fs = require('fs')
const communityService = require('../service/CommunityService')
const multer = require('multer');
const { model } = require('mongoose');



const uploadAssetImagesController = async (req, res) => {
    try {
      // Here, req.files itself is the array of files
      const files = req.files;
    
  
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: "No image files uploaded" });
      }
  
      const assetId = req.params.id;
      const description = req.body.description;
      const isPrimary = req.body.is_primary;
  
      const uploadPromises = files.map((file) =>
        communityService.uploadfile(assetId, file, description, isPrimary)
      );
  
      const uploadedImages = await Promise.all(uploadPromises);
  
      res.status(201).json({
        success: true,
        message: 'Images uploaded successfully!',
        images: uploadedImages.map(image => image.img_url)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const createAssetTypeController = async(req,res)=>{
    try {
        const data = req.body
        const assetType = await communityService.createAssetType(data)
        return res.status(201).json({
            success:true,
            assetType,
            message:"Assset Type Created successfully"
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const createAssetController = async(req,res)=>{
    try {
        const user_id=req.user.id
        const asset_type_id = req.params.id
        const {name,lat,long,status,government_scheme,issues}=req.body
        const data = {name,lat,long,status,government_scheme,issues,asset_type_id,user_id}
        const asset = await communityService.createAsset(data)
        return res.status(201).json({
            success:true,
            asset,
            message:"Asset created successfully"
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getAssetController = async(req,res)=>{
    try {
        const assetTypeList = await communityService.getAllAssetTypes()
        return res.status(200).json({
            success:true,
            assetTypeList,
            message:"Asset type get successfully"
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const createDevelopementController = async(req,res)=>{
    try {
        const user_id=req.user.id
        const {scheme_name,lat,long,status,amount,feedback,assigned_person,phone_no,category_id}=req.body
        const data = {scheme_name,lat,long,status,amount,feedback,assigned_person,user_id,phone_no,category_id}
        const asset = await communityService.createdevelopement(data)
        return res.status(201).json({
            success:true,
            asset,
            message:"Developement Project created successfully"
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const uploadDevelopementImagesController = async (req, res) => {
    try {
      // Here, req.files itself is the array of files
      const files = req.files;
    
  
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: "No image files uploaded" });
      }
  
      const assetId = req.params.id;
      const description = req.body.description;
      const isPrimary = req.body.is_primary;
  
      const uploadPromises = files.map((file) =>
        communityService.uploadfiledevelopement(assetId, file, description, isPrimary)
      );
  
      const uploadedImages = await Promise.all(uploadPromises);
  
      res.status(201).json({
        success: true,
        message: 'Images uploaded successfully!',
        images: uploadedImages.map(image => image.img_url)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const categoryController = async(req,res)=>{
  try {
    const data = req.body
    const categories = await communityService.createCategory(data)
    return res.status(200).json({
      success:true,
      message:"Category created successfully",
      categories
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getProjectsByCategoryController = async(req,res)=>{
  try {
    const categoryId = req.params.id
    const {page,pageSize,year}=req.body
    const {projects,remaining} = await communityService.getDevelopementProjectsByCategory(categoryId, page, pageSize, year)
    return res.status(200).json({
      success:true,
      remaining,
      projects,
      message:"Projects fetched successfully"
    })
  } catch (error) {
     res.status(500).json({message:error.message})
  }
}

const addCommunityCategoryController = async(req,res)=>{
  try {
    const data = req.body
    const category = await communityService.addCommunityCategory(data)
    return res.status(200).json({
      success:true,
      category,
      message:'Category created successfully'
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const addCommunityLeader = async(req,res)=>{
  try {
    const {name,community_name,community_category_id,active_members,programs,phone_no,contribution,support_required,other_reason,is_leader,leader_id,booth_id,gaon_panchayat_id} = req.body
    const user_id = req.user.id
    const data = {name,community_name,community_category_id,active_members,programs,phone_no,contribution,support_required,other_reason,is_leader,leader_id,user_id,booth_id,gaon_panchayat_id}
    const community = await communityService.addCommunityLeader(data)
    return res.status(200).json({
      success:true,
      community,
      message:"Community leader added successfully"
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const addCommunityMemberController = async(req,res)=>{
  try {
    
    const {name,community_name,community_category_id,active_members,programs,phone_no,contribution,support_required,other_reason,is_leader,leader_id} = req.body
    const user_id = req.user.id
    const data = {name,community_name,community_category_id,active_members,programs,phone_no,contribution,support_required,other_reason,is_leader,leader_id,user_id}
  
    const community = await communityService.addCommunityMember(data)
    
    return res.status(200).json({
      success:true,
      community,
      message:"Community Member Added Successfully"
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const getCommunityByLeaderid = async(req,res)=>{
  try {
    const id = req.params.id
    const {leader,members}= await communityService.getCommunityByLeaderId(id)
    return res.status(200).json({
      success:true,
      leader,
      members,
      message:"Community Group fetched successfully"
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const getTotalProjects = async(req,res)=>{
  try {
    const count = await communityService.getAllProjects()
    return res.status(200).json({
      success:true,
      count,
      message:"Count of all projects fetched successfully"
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}


const getTotalBudgetController = async(req,res)=>{
  try {
    const amount = await communityService.getTotalBudget()
    return res.status(200).json({
      success:true,
      amount,
      message:"Total budget fetched successfully"
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const getTotalCompletedProjects = async(req,res)=>{
  try {
    const count = await communityService.getTotalCompletedProjectsCount()
   
    return res.status(200).json({
      success:true,
      count,
      message:'Total completed projects count fetched successfully'
    })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const getCompletedProjectsByCategory=async(req,res)=>{
  try {
    const categoryId=req.params.id
    const count = await communityService.getCompletedProjectsByCategory(categoryId)
   
    return res.status(200).json({
      success:true,
      count,
      message:"Completed projects by category fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getCompletedProjectBudgetByCategory = async(req,res)=>{
  try {
    const categoryId= req.params.id
    const amount = await communityService.getCompletedProjectBudgetByCategory(categoryId)
    return res.status(200).json({
      success:true,
      amount,
      message:"Completed projects category budget fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllCategories = async(req,res)=>{
  try {
    const {is_existing} = req.body
    const categories = await communityService.getAllCategories(is_existing)
    return res.status(200).json({
      success:true,
      categories,
      message:"Categories fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getTotalInprogressProjectsController = async(req,res)=>{
  try {
    const projects = await communityService.getTotalInprogressCategory()
    return res.status(200).json({
      success:true,
      projects,
      message:"Inprogess projects fetched successfully"
    })

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getInprogressProjectsByCategoryController = async(req,res)=>{
  try {
    const categoryId= req.params.id
    const projects = await communityService.getInprogressProjectsByCategory(categoryId)
    return res.status(200).json({
      success:true,
      projects,
      message:"Inprogess projects fetched successfully"
    })

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


const getAllCommunityGroupCategory = async(req,res)=>{
  try {
    const groups = await communityService.getCommunityGroupCategory()
    return res.status(200).json({
      success:true,
      groups,
      message:"Groups fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


const getAllDevelopementProejctController = async(req,res)=>{
  try {
    const {page,pageSize}=req.body
    const {projects,remaining}=await communityService.getAllDevelopementProjects(page,pageSize)
    return res.status(200).json({
      success:true,
      remaining,
      projects,
      message:"Developement projects fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllCommunitygroupsController = async(req,res)=>{
  try {
    const {page,pageSize} = req.body
    const {groups,remaining}= await communityService.getAllCommunityGroups(page,pageSize)
    return res.status(200).json({
      success:true,
      remaining,
      groups,
      message:"Community groups fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllCommunityGroupsByCategory = async(req,res)=>{
  try {
    const {page,pageSize}=req.body
    const categoryid=req.params.id
   
    const {groups,remaining}= await communityService.getAllCommunityGroupsByCategory(categoryid,page,pageSize)
    return res.status(200).json({
      success:true,
      remaining,
      groups,
      message:"Groups fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllCommunityGroupsByCategoryByUser = async(req,res)=>{
  try {
    const {page,pageSize}=req.body
    const categoryid=req.params.id
    const userid = req.user.id
   
    const {groups,remaining}= await communityService.getAllCommunityGroupsByCategoryByUser(userid,categoryid,page,pageSize)
    return res.status(200).json({
      success:true,
      remaining,
      groups,
      message:"Groups fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllCommunitygroupsByUserController = async(req,res)=>{
  try {
    const {page,pageSize} = req.body
    const userid=req.user.id
    const {groups,remaining}= await communityService.getAllCommunityGroupsByUser(userid,page,pageSize)
    return res.status(200).json({
      success:true,
      remaining,
      groups,
      message:"Community groups fetched successfully"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


module.exports= {uploadAssetImagesController,createAssetTypeController,createAssetController,getAssetController,createDevelopementController,uploadDevelopementImagesController,categoryController,getProjectsByCategoryController,addCommunityCategoryController,addCommunityLeader,addCommunityMemberController,getCommunityByLeaderid,getTotalProjects,getTotalBudgetController,getTotalCompletedProjects,getCompletedProjectsByCategory,getCompletedProjectBudgetByCategory,getAllCategories,getTotalInprogressProjectsController,getInprogressProjectsByCategoryController,getAllCommunityGroupCategory,getAllDevelopementProejctController,getAllCommunitygroupsController,getAllCommunityGroupsByCategory,getAllCommunityGroupsByCategoryByUser,getAllCommunitygroupsByUserController}