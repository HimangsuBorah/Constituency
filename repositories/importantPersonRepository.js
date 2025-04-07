
const {models}=require('../model/index');

class ImportantPersonRepository{

    async createImportantPersonData(data){
        try {
            
            const importantperson = await models.ImportantPerson.create(data)
            return importantperson
        } catch (error) {
            throw error
        }
    }

    async getImportantPersonById(id){
        try {
            const importantperson = await models.ImportantPerson.findByPk(id)
            return importantperson
        } catch (error) {
            throw error
        }
    }


    async getAllImportantPersons(){
        try {
            const importantpersons = await models.ImportantPerson.findAll()
            return importantpersons
        } catch (error) {
            throw error
        }
    }

    async getImportantPersonByVillage(id){
        try {
            const importantpersons = await models.ImportantPerson.findAll({
                where:{
                    village_id:id
                }
            })
            return importantpersons
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ImportantPersonRepository()