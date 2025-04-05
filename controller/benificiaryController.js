const benificiaryService = require('../service/beneficiaryService')

const createSchemeCategoryController = async(req,res)=>{
    try {
        const data = req.body
        const schemeCategory = await benificiaryService.createSchemeCategory(data)
        return res.status(201).json({
            success:true,
            schemeCategory,
            message:"Scheme category created successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllSchemeCategory = async(req,res)=>{
    try {
        const schemes = await benificiaryService.getAllSchemeCategory()
        return res.status(201).json({
            success:true,
            schemes,
            message:"Schemes fetched successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const createBenificary = async(req,res)=>{
    try {
        const user_id = req.user.id
        const {enrollment_date,scheme_id,note} = req.body
        
        const data = {enrollment_date,scheme_id,note,user_id}
        
        const beneficiary = await benificiaryService.createBenificiary(data)
        return res.status(201).json({
            success:true,
            beneficiary,
            message:'Benificiary created successfully'
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createSchemeController = async(req,res)=>{
    try {
        const data = req.body
        const scheme = await benificiaryService.createScheme(data)
        return res.status(201).json({
            success:true,
            scheme,
            message:'Scheme created successfully'
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const uploadBenificiaryImagesController = async (req, res) => {
    try {
      // Here, req.files itself is the array of files
      const files = req.files;
    
  
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: "No image files uploaded" });
      }
  
      const benificiaryid = req.params.id;
      const description = req.body.description;
      const isPrimary = req.body.is_primary;
      const isBefore = req.body.isBefore
  
      const uploadPromises = files.map((file) =>
        benificiaryService.uploadfilescheme(benificiaryid, file, description, isPrimary,isBefore)
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


module.exports = {createSchemeCategoryController,getAllSchemeCategory,createBenificary,createSchemeController,uploadBenificiaryImagesController}