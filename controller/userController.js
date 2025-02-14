const authService = require('../service/userService')

/**
 * Controller to handle user signup
 * @param {Request} req
 * @param {Response} res
 */
const signupController = async (req, res) => {
    try {
      const data = req.body;
    //   console.log(data)
      
  
      const newUser = await authService.registerData(data)
     
  
  
      // Respond with the created user (omit password in the response)
      res.status(201).json({
        message: 'User registered successfully!',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          name:newUser.name,
          phoneNumber:newUser.phoneNumber,
          
        },
      });
    } catch (error) {
      console.error('Error during user registration:', error.message);
      res.status(500).json({ error: `An error occurred during registration. Please try again ${error.message}` });
    }
  };


  module.exports = {signupController}