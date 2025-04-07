// src/auth/routes/authRoutes.js
const express = require('express');
const importantPersonController = require('../controller/importantPersonController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');




const router = express.Router();

router.post('/add-importantperson',isAuthenticated,importantPersonController.createImportantPersonController);



module.exports = router;