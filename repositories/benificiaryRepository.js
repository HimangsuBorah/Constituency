const {models}=require('../model/index');

class BenificiaryRepository{

    async createSchemeCategory(data){
        try {
            const SchemeCategory = await models.SchemeCategory.create(data)
            return SchemeCategory
        } catch (error) {
            throw error
        }
    }

    async getAllSchemeCategory(){
        try {
            const schemeCategories = await models.SchemeCategory.findAll()
            return schemeCategories
        } catch (error) {
            throw error
        }
    }

    async createScheme(data){
        try {
            console.log(data)
            const scheme = await models.Schemes.create(data)
            
            return scheme
        } catch (error) {
            throw error
        }
    }

    async getAllSchemes(){
        try {
            const schemes = await models.Schemes.findAll()
            return schemes
        } catch (error) {
            throw error
        }
    }

    async createBenificary(data){
        try {
            const benificary = await models.Benificary.create(data)
            return benificary
        } catch (error) {
            throw error
        }
    }

    async createBenificaryImage(beneficiaryid,url,description,isPrimary,isBefore){
        try {
            
            const benificaryimage = await models.BenificaryImages.create({
                beneficiary_id:beneficiaryid,
                img_url:url,
                description:description,
                is_primary:isPrimary,
                isBefore:isBefore
            })

            return benificaryimage
        } catch (error) {
            throw error
        }
    }

    async findSchemeById(id){
        try {
            const scheme = await models.Schemes.findByPk(id)
            return scheme
        } catch (error) {
            throw error
        }
    }

    async getBeneficiaryByScheme(schemeid){
        try {
            const beneficiary = await models.Benificary.findAll({
                where:{
                    scheme_id:schemeid
                },
                include:[{
                    model:models.BenificaryImages,
                    as:'images'
                }]
            })
            return beneficiary
        } catch (error) {
            throw error
        }
    }

    async getBenificiaryById(beneficiaryid){
        try {
            const beneficiary = await models.Benificary.findByPk(beneficiaryid)
            return beneficiary
        } catch (error) {
            throw error
        }
    }

    async getAllSchemeByCategory(categoryid){
        try {
            const schemes = await models.Schemes.findAll({
                where:{
                    scheme_catgory_id:categoryid
                }
            })

            return schemes
        } catch (error) {
            throw error
        }
    }
}

module.exports= new BenificiaryRepository()