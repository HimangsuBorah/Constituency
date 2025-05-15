// src/auth/routes/authRoutes.js
const express = require('express');
const benficiaryController = require('../controller/benificiaryController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    // Optional: log field name for debugging
    console.log("Received field:", file.fieldname);
    
    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
  
    if (allowedFileTypes.includes(ext)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only image files are allowed.'), false);
    }
  };

const upload = multer({
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
  });



const router = express.Router();

router.post('/add-scheme-category',isAuthenticated,benficiaryController.createSchemeCategoryController);
router.get('/get-all-scheme-categories',isAuthenticated,benficiaryController.getAllSchemeCategory)
router.post('/create-scheme',isAuthenticated,benficiaryController.createSchemeController)
router.post('/create-benificiary',isAuthenticated,isAuthenticated,benficiaryController.createBenificary)
router.post('/upload-benificiary-image/:id',isAuthenticated,upload.array('images', 10), benficiaryController.uploadBenificiaryImagesController);
router.get('/all-schemes/:id',isAuthenticated,benficiaryController.getSchemeByCategory)
router.get('/get-beneficiaries-by-scheme/:id',isAuthenticated,benficiaryController.getBeneficiaryBySchemeId)


module.exports = router;