

const housedataRepository = require('../repositories/housedataRepository')

class HouseDataService{

    async addBoothData(data){
        try {
            const booth = await housedataRepository.createBooth(data)
            return booth
        } catch (error) {
            throw error
        }
    }

    async addPanchayatData(data){
        try {
            const panchayat = await housedataRepository.createPanchayat(data)
            return panchayat
        } catch (error) {
            throw error
        }
    }

    async getBoothDatabyId(id){
        try {
            const booth = await housedataRepository.getBoothById(id)
            return booth
        } catch (error) {
            throw error
        }
    }

    async getPanchayatDatabyId(id){
        try {
            const panchayat = await housedataRepository.getPanchayatDataById(id)
            return panchayat
        } catch (error) {
            throw error
        }
    }

    async getAllPanchayat(id){
        try {
            const panchayat = await housedataRepository.getAllPanchayat()
            return panchayat
        } catch (error) {
            throw error
        }
    }

    async getAllBooth(){
        try {
            const booth = await housedataRepository.getAllBooth()
            return booth
        } catch (error) {
            throw error
        }
    }

    async addHeadMember(data){
        try {
            const headMember = await housedataRepository.addHeadMember(data)
            return headMember
        } catch (error) {
            throw error
        }
    }

    async addMember(data){
        try {
            
            if (data.head_member_id) {
                const headMember = await housedataRepository.findMemberById(data.head_member_id);
                if (!headMember) {
                  throw new Error('Invalid Head Member ID: Head Member not found.');
                }
                if (!headMember.is_head) {
                  throw new Error('Invalid Head Member ID:  Member is not designated as Head.');
                }
              }
            const member = await housedataRepository.addMember(data)
            return member
        } catch (error) {
            throw error
        }
    }

}

module.exports = new HouseDataService()