const importantPersonServices = require('../service/importantPersonService')

const createImportantPersonController = async(req,res)=>{
    try {
    const entered_by = req.user.id
    const {name,mobile_number,email,designation,village_id,description,is_verified,mode_of_communication}=req.body
    const data = {name,mobile_number,email,designation,village_id,description,is_verified,mode_of_communication,entered_by}
    const importantperson = await importantPersonServices.createImportantPerson(data)
    return res.status(200).json({
        success:true,
        importantperson,
        message:"Important Person Created Successfully"
    })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllImportantPerson = async(req,res)=>{
    try {
        const importantpersons = await importantPersonServices.getAllImportantPerson()
        return res.status(200).json({
            success:true,
            importantpersons,
            message:"Important Persons Fetched successfully"
        })
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const getImportantPersonById =async(req,res)=>{
    try {
        const id = req.params.id
        const person = await importantPersonServices.getImportantPersonById(id)
        return res.status(200).json({
            success:true,
            person,
            message:"Important Person fetched successfully"

        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getImportantPersonByVillage = async(req,res)=>{
    try {
        const id = req.params.villageid
        const persons = await importantPersonServices.getImportantPersonByVillage(id)
        return res.status(200).json({
            success:true,
            persons,
            message:"Important Persons List Fetched Successfully"
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports = {createImportantPersonController,getAllImportantPerson,getImportantPersonById,getImportantPersonByVillage}