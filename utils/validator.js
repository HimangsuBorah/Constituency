
const authRepository = require('../repositories/authRepository'); 
class ValidatorService {
    async validateRegistrationData(data) {
        const { password, phoneNumber, role, name, is_active, approval_status } = data;

        const errors = {}; 

        if (!phoneNumber) {
            errors.phoneNumber = "Phone number is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        if (!name) {
            errors.name = "Name is required";
        }

        if(Object.keys(errors).length > 0) {
          throw { status:400,errors, message: "Validation failed" }; 
        }


        try { 
            const user = await authRepository.findByPhoneNumber(phoneNumber);
            if (user) {
                 throw { message:"User already exists", errors: {phoneNumber : "User with this phone number already exists."} } ;
            }
         } catch(error) { //catch any database errors
          console.error("Error in validating registration",error)
           throw {message:"Error in database while validating", errors: { database: "A database error occured while validating the user." } }

        }
    }
}

module.exports = new ValidatorService();