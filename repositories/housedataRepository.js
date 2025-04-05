
const {models}=require('../model/index');


class HouseDataRepository{

    async createBooth(data){
        try {
            const booth = await models.Booth.create(data)
            return booth
        } catch (error) {
            throw error
        }
    }

    async createPanchayat(data){
        try {
            const panchayat = await models.GaonPanchayat.create(data)
            return panchayat
        } catch (error) {
            throw error
        }
    }

    async getBoothById(id){
        try {
            const booth = await models.Booth.findByPk(id)
            return booth
        } catch (error) {
            throw new Error
        }
    }

    async getPanchayatDataById(id){
        try {
            const panchayat = await models.GaonPanchayat.findByPk(id)
            return panchayat
        } catch (error) {
            throw new Error
        }
    }

    async getAllPanchayat(){
        try {
            const panchayat = await models.GaonPanchayat.findAll()
            return panchayat
        } catch (error) {
            throw new Error
        }
    }

    async getAllBooth(){
        try {
            const booths = await models.Booth.findAll()
            return booths
        } catch (error) {
            throw error
        }
    }

    async addHeadMember(data){
        try {
            const member = await models.Member.create(data)
            return member
        } catch (error) {
            throw error
        }
    }

    async addMember(data){
        try {
            
            const { head_member_id, name, voter_id, mobile_number, date_of_birth, email, marital_status, gender, employment_status, employment_source, cast, religion, education, annual_income,relation, government_scheme } = data;
            const head_member = await models.Member.findByPk(head_member_id)
            
            if(!head_member){
                throw new Error("Head member does not exist")
            }
       
            const member = await models.Member.create(data)
            
            return member
        } catch (error) {
            throw error
        }
    }

    async findMemberById(id){
        try {
            const member = await models.Member.findByPk(id)
            return member
        } catch (error) {
            throw error
        }
    }

    async getFamilyBYHeadid(id){
        try {
            const head = await models.Member.findByPk(id)
            if(!head){
                throw new Error("Head of the family does not exists")
            }
            const members = await models.Member.findAll({
                where:{
                    head_member_id:id
                }
            })
            return {head,members}
        } catch (error) {
            throw error
        }
    }

    async getallZpc(){
        try {
            const zpcs = await models.ZPC.findAll()
            return zpcs
        } catch (error) {
            throw error
        }
    }

    async getPanchayatByZPC(zpcid){
        try {
            const panchayat = await models.GaonPanchayat.findAll({
                where:{
                    zpc_id:zpcid
                }
            })
            return panchayat
        } catch (error) {
            throw error
        }
    }

    async getVillageByPanchayatId(panchayatid){
        try {
            const villages = await models.Village.findAll({
                where:{
                    gaon_panchayat_id:panchayatid
                }
            })
            return villages
        } catch (error) {
            throw error
        }
    }

    async getPanchayatByVillage(villageid){
        try {
            const panchayat = await models.Village.findAll({
                where:{
                    id:villageid
                },
                include: [{
                    model:models.GaonPanchayat,
                    as:'panchayat_name'
                }],
            })
            return panchayat
        } catch (error) {
            throw error
        }
    }

}

module.exports = new HouseDataRepository()