
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
            console.log(data)
            const { head_member_id, name, voter_id, mobile_number, date_of_birth, email, marital_status, gender, employment_status, employment_source, cast, religion, education, annual_income,relation, government_scheme } = data;
            const head_member = await models.Member.findByPk(head_member_id)
            
            if(!head_member){
                throw new Error("Head member does not exist")
            }
       
            const member = await models.Member.create(data)
            console.log(member)
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

}

module.exports = new HouseDataRepository()