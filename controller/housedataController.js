const houseDataService = require('../service/housedataService') 



const addboothDataController = async(req,res)=>{
    try {
        const data = req.body
        // const {booth_no,gaon_panchayat_id}=data
        // if(!booth_no || !gaon_panchayat_id){
        //     return res.status(400).json({message:"booth no and panchayat_id is must"})
        // }
        const booth = await houseDataService.addBoothData(data)
        return res.status(201).json({
            success:true,
            booth,
            message:"Booth data created successfully"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const addpanchayatDataController = async(req,res)=>{
    try {
        const data = req.body
        const panchayat = await houseDataService.addPanchayatData(data)
        return res.status(201).json({
            success:true,
            panchayat,
            message:"panchayat data created successfully"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getBoothByIdController = async(req,res)=>{
    try {
        const boothId = req.params.id
        const booth = await houseDataService.getBoothDatabyId(boothId)
        return res.status(200).json({
            success:true,
            booth,
            message:"booth data fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getPanchayatByIdController = async(req,res)=>{
    try {
        const id = req.params.id
        const panchayat = await houseDataService.getPanchayatDatabyId(id)
        return res.status(200).json({
            success:true,
            panchayat,
            message:"panchayat data fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getAllPanchayatController = async(req,res)=>{
    try {
        const panchayat = await houseDataService.getAllPanchayat()
        return res.status(200).json({
            success:true,
            panchayat,
            message:"panchayat data fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getAllBooth = async(req,res)=>{
    try {
        
        const booth = await houseDataService.getAllBooth()
        return res.status(200).json({
            success:true,
            booth,
            message:"booth data fetched successfully"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const addHeadController = async(req,res)=>{
    try {
        const { head_member_id, name, voter_id, mobile_number, date_of_birth, email, marital_status, gender, employment_status, employment_source, caste, religion, education, annual_income,relation, government_scheme,is_head } = req.body;

        const entered_by = req.user.id
       
      
        const data = {head_member_id, name, voter_id, mobile_number, date_of_birth, email, marital_status, gender, employment_status, employment_source, caste, religion, education, annual_income,relation, government_scheme,entered_by,is_head}
        const headmember = await houseDataService.addHeadMember(data)
      
        return res.status(201).json({
            success:true,
            headmember,
            message:"Head Member Created Successfully"
        })

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const addFamilyMember = async(req,res)=>{
    try {
        
        const { name, voter_id, mobile_number, date_of_birth, email, marital_status, gender, employment_status, employment_source, caste, religion, education, annual_income,relation, government_scheme } = req.body;
    
        const entered_by = req.user.id
        const head_member_id=req.params.id
      
        const data = {head_member_id, name, voter_id, mobile_number, date_of_birth, email, marital_status, gender, employment_status, employment_source, caste, religion, education, annual_income,relation, government_scheme,entered_by}
        
        const member = await houseDataService.addMember(data)
        
        return res.status(201).json({
            success:true,
            member,
            message:"Member created sucessfully"
        })


    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = {addboothDataController,addpanchayatDataController,getBoothByIdController,getPanchayatByIdController,getAllPanchayatController,getAllBooth,addHeadController,addFamilyMember}