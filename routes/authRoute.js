// src/auth/routes/authRoutes.js
const express = require('express');
const authController = require('../controller/authController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');




const router = express.Router();

router.post('/register',authController.signupController);
router.post('/login',authController.loginController)
router.post('/refreshtoken',authController.refreshTokenController)
router.get('/getuserbyId',isAuthenticated,authController.getUserByIdController)
router.put('/deleteaccount/:id',isAuthenticated,authController.disableUserController)
router.put('/deleteuser',authController.disableUserByForm)
router.put('/add-data-profile',authController.addDemographicDataController)


module.exports = router;