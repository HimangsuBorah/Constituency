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

router.post('/add-scheme-category',benficiaryController.createSchemeCategoryController);
router.get('/get-all-scheme-categories',benficiaryController.getAllSchemeCategory)
router.post('/create-scheme',benficiaryController.createSchemeController)
router.post('/create-benificiary',isAuthenticated,benficiaryController.createBenificary)
router.post('/upload-benificiary-image/:id',upload.array('images', 10), benficiaryController.uploadBenificiaryImagesController);


module.exports = router;