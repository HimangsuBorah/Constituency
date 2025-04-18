const bcrypt = require('bcrypt');

const authService = require('../service/authService');
const ValidatorService = require('../utils/validator')
const jwt = require('jsonwebtoken');


/**
 * Controller to handle user signup
 * @param {Request} req
 * @param {Response} res
 */
const signupController = async (req, res) => {
  try {
    const data = req.body;
    await ValidatorService.validateRegistrationData(data)
   

    const newUser = await authService.registerData(data)
   


    // Respond with the created user (omit password in the response)
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        name:newUser.name,
        phoneNumber:newUser.phoneNumber,
        boothid:newUser.booth_id,
        panchayat_id:newUser.gaon_panchayat_id,
        village_id:newUser.village_id,
        is_verified:newUser.is_verified
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ error: `An error occurred during registration. Please try again ${error.message}` });
  }
};

const loginController = async(req,res)=>{
  try {

    const {phoneNumber,password}=req.body

    const loggedUser = await authService.login(phoneNumber,password)

    return res.status(200).json({
      success:true,
      message:"Logged in successfully",
      accessToken:loggedUser.accessToken,
      refreshToken:loggedUser.refreshToken,
      user:loggedUser.user
    })
    
  } catch (error) {
    console.error('Error during user login:', error.message);
    res.status(500).json({ error: 'An error occurred during login. Please try again.' });
  }
}


const refreshTokenController = async(req,res)=>{
  try {
    const {refreshToken} = req.body
    const {newaccessToken,newrefreshToken}= await authService.refreshtoken(refreshToken)
    
    res.status(200).json({
        success:true,
        accessToken:newaccessToken,
        refreshToken:newrefreshToken
    })
} catch (error) {
    res.status(400).send({message: error.message});
}
}

const getUserByIdController = async(req,res)=>{
  try {
      const userId = req.user.id
      const user = await authService.getUserById(userId)
      
      return res.status(200).json({
        success:true,
        message:"User found successfully",
        user
      })
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}


const disableUserController = async(req,res)=>{
  try {
    const userId = req.params.id
    const user = await authService.disableUser(userId)
    
    return res.status(200).json({
      success:true,
      message:"User disabled successfully",
      user
    })
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}


const disableUserByForm = async(req,res)=>{
  try {
    const {phoneNumber,password}=req.body
    
    const user = await authService.disableUserByForm(phoneNumber,password)
    return res.status(200).json({
      success:true,
      message:"User disabled successfully",
      user
    })
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const addDemographicDataController = async(req,res)=>{
  try {
    const userid = req.user.id
    const {booth_id,gaon_panchayat_id}=req.body
    const user = await authService.addDemographicDataController(userid,booth_id,gaon_panchayat_id)
    return res.status(200).json({
      success:true,
      user,
      message:"Demographic user added successfully"
    })
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const registerAsSMWController = async(req,res)=>{
  try {
    const user_id= req.user.id
    const {instagram_link,facebook_link,twitter_link}=req.body
    const data = {instagram_link,facebook_link,twitter_link,user_id}
    const smw = await authService.registerAsSMW(data)
    return res.status(201).json({
      success:true,
      smw,
      message:"SMW added successfully"
    })

  } catch (error) {
    res.status(400).json({message:error.message})
  }
}





module.exports = {signupController,loginController,refreshTokenController,getUserByIdController,disableUserController,disableUserByForm,addDemographicDataController,registerAsSMWController};
