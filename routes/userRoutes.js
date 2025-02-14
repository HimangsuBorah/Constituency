// src/auth/routes/authRoutes.js
const express = require('express');
const authController = require('../controller/userController');




const router = express.Router();

router.post('/registeruser',authController.signupController);




module.exports = router;