const importantPersonRepository = require('../repositories/importantPersonRepository')

class ImportantPersonService{
    async createImportantPerson(data){
        try {
            const importantperson = await importantPersonRepository.createImportantPersonData(data)
            return importantperson
        } catch (error) {
            throw error
        }
    }

    async getImportantPersonById(id){
        try {
            const importantperson = await importantPersonRepository.getImportantPersonById(id)
            return importantperson
        } catch (error) {
            throw error
        }
    }

    async getAllImportantPerson(){
        try {
            const importantpersons = await importantPersonRepository.getAllImportantPersons()
            return importantpersons
        } catch (error) {
            throw error
        }
    }

    async getImportantPersonByVillage(id){
        try {
            const importantperson = await importantPersonRepository.getImportantPersonByVillage(id)
            return importantperson
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ImportantPersonService()