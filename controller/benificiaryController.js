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
        const {enrollment_date,scheme_id,note,booth_id,village_id,name,gender} = req.body
        
        const data = {enrollment_date,scheme_id,note,user_id,booth_id,village_id,name,gender}
        
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
      const scheme_id=req.body.scheme_id
  
      const uploadPromises = files.map((file) =>
        benificiaryService.uploadfilescheme(benificiaryid, file, description, isPrimary,isBefore,scheme_id)
      );
  
      const uploadedImages = await Promise.all(uploadPromises);
      
  
      res.status(201).json({
        success: true,
        message: 'Images uploaded successfully!',
        images: uploadedImages.map(image => ({img_url:image.img_url,
            scheme_id:image.scheme_id
        }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getSchemeByCategory = async(req,res)=>{
    try {
        const categoryid=req.params.id
        const schemes = await benificiaryService.getAllSchemeByCategory(categoryid)
        return res.status(200).json({
            success:true,
            schemes,
            message:"Schemes fetched successfully"

        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  const getBeneficiaryBySchemeId = async(req,res)=>{
    try {
        const schemeid = req.params.id
        const beneficiaries = await benificiaryService.getBeneficiraiesBySchemeId(schemeid)
        return res.status(200).json({
            success:true,
            beneficiaries,
            message:"Beneficaires created successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

module.exports = {createSchemeCategoryController,getAllSchemeCategory,createBenificary,createSchemeController,uploadBenificiaryImagesController,getSchemeByCategory,getBeneficiaryBySchemeId}