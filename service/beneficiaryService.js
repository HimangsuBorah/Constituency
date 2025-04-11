const BenificiaryRepository = require('../repositories/benificiaryRepository')
const { uploadImageToBunny } = require("../utils/bunnyUploader");


class BenificiaryService{

    async createSchemeCategory(data){
        try {
            const schemes = await BenificiaryRepository.createSchemeCategory(data)
            return schemes
        } catch (error) {
            throw error
        }
    }

    async getAllSchemeCategory(){
        try {
            const categories = await BenificiaryRepository.getAllSchemeCategory()
            return categories
        } catch (error) {
            throw error
        }
    }

    async createScheme(data){
        try {
            
            const scheme = await BenificiaryRepository.createScheme(data)
            return scheme
        } catch (error) {
            throw error
        }
    }

    async getAllSchemes(){
        try {
            const schemes = await BenificiaryRepository.getAllSchemes()
            return schemes
        } catch (error) {
            throw error
        }
    }

    async createBenificiary(data){
        try {
            const benificiary = await BenificiaryRepository.createBenificary(data)
            return benificiary
        } catch (error) {
            throw error
        }
    }

    async uploadfilescheme(benificiaryid, file, description, isPrimary,isBefore,scheme_id) {
        try {
          const scheme = await BenificiaryRepository.getBenificiaryById(benificiaryid);
    
          if (!scheme) throw new Error("Invalid Scheme ID");
          const folder = "beneficiary"
          const imageUrl = await uploadImageToBunny({
            id:benificiaryid,
            file,
            folder
          });
    
          const record = await BenificiaryRepository.createBenificaryImage(
            benificiaryid,
            imageUrl,
            description,
            isPrimary,
            isBefore,
            scheme_id
          );
          
          return record;
        } catch (err) {
          console.error("❌ UploadFile Error:", err.message);
          throw err;
        }
      }

      async getAllSchemeByCategory(categoryid){
        try {
            const schemes = await BenificiaryRepository.getAllSchemeByCategory(categoryid)
            return schemes
        } catch (error) {
            throw error
        }
      }

      async getBeneficiraiesBySchemeId(schemeid){
        try {
            const beneficiaries = await BenificiaryRepository.getAllBeneficiariesBySchemeId(schemeid)
            return beneficiaries
        } catch (error) {
            throw error
        }
      }
        

}

module.exports = new BenificiaryService()