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
            sucess:true,
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
            sucess:true,
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
            sucess:true,
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
        const {scheme_name,lat,long,status,amount,feedback,assigned_person}=req.body
        const data = {scheme_name,lat,long,status,amount,feedback,assigned_person,user_id}
        const asset = await communityService.createdevelopement(data)
        return res.status(201).json({
            sucess:true,
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


module.exports= {uploadAssetImagesController,createAssetTypeController,createAssetController,getAssetController,createDevelopementController,uploadDevelopementImagesController,categoryController,getProjectsByCategoryController}