
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
            throw new Error
        }
    }

}

module.exports = new HouseDataRepository()