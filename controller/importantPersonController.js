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


module.exports = {createImportantPersonController}