// src/auth/routes/authRoutes.js
const express = require('express');
const communityController = require('../controller/communityServiceController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const assetId = req.params.id; // Use req.params.id to match your route
//         const uploadDir = path.join(__dirname, '../uploads', assetId);

//         fs.mkdir(uploadDir, { recursive: true }, (err) => { //Corrected file for asynchronous mkdir (recommended)
//             if (err) {
//                 console.error("Error creating directory:", err);
//                 return cb(err); //Pass the error to Multer to be handled, it will stop this process
//             }
//             cb(null, uploadDir); //Success, tell Multer where to upload
//         });
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//     }
// });

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
  

router.post('/upload-image/:id',upload.array('images', 10), communityController.uploadAssetImagesController);
router.post('/create-asset-type',isAuthenticated, communityController.createAssetTypeController);
router.post('/create-asset/:id',isAuthenticated, communityController.createAssetController);
router.get('/getall-assettypes',isAuthenticated,communityController.getAssetController)
router.post('/create-developement', isAuthenticated,communityController.createDevelopementController);
router.post('/upload-developement-image/:id',upload.array('images', 10), isAuthenticated,communityController.uploadDevelopementImagesController);
router.get('/getall-assettypes',isAuthenticated,communityController.getAssetController)
router.post('/create-category',isAuthenticated,communityController.categoryController)
router.post('/getprojectsbycategory/:id',communityController.getProjectsByCategoryController)
router.post('/create-communitycategory',isAuthenticated,communityController.addCommunityCategoryController)
router.post('/add-communitylead',isAuthenticated,communityController.addCommunityLeader)
router.post('/add-communitymember',isAuthenticated,communityController.addCommunityMemberController)
router.get('/getcommunitygroup/:id',isAuthenticated,communityController.getCommunityByLeaderid)

router.get('/total-projects-count',isAuthenticated,communityController.getTotalProjects)
router.get('/total-budget',isAuthenticated,communityController.getTotalBudgetController)
router.get('/total-completed-projects',isAuthenticated,communityController.getTotalCompletedProjects)
router.get('/completedprojects-category/:id',isAuthenticated,communityController.getCompletedProjectsByCategory)
router.get('/completedprojects-budget-category/:id',isAuthenticated,communityController.getCompletedProjectBudgetByCategory)
router.post('/all-development-categories',isAuthenticated,communityController.getAllCategories)
router.post('/all-developement-categories',communityController.getAllCategories)
router.get('/get-total-inprogressprojects',isAuthenticated,communityController.getTotalInprogressProjectsController)
router.get('/get-total-projectsbycategory/:id',isAuthenticated,communityController.getInprogressProjectsByCategoryController)

router.get('/get-all-communitygroups/categories',isAuthenticated,communityController.getAllCommunityGroupCategory)
router.get('/get-all-development-projects',isAuthenticated,communityController.getAllDevelopementProejctController)
router.get('/get-all-developement-projects',communityController.getAllDevelopementProejctController)
router.get('/get-all-community-groups',isAuthenticated,communityController.getAllCommunitygroupsController)
router.get('/get-all-communitygroups-bycategory/:id',isAuthenticated,communityController.getAllCommunityGroupsByCategory)
router.post('/get-community-groups-by-category-by-user/:id',isAuthenticated,communityController.getAllCommunityGroupsByCategoryByUser)
router.post('/get-all-community-groups-by-user',isAuthenticated,communityController.getAllCommunitygroupsByUserController)

router.post('/get-all-assets-by-category',isAuthenticated,communityController.getAllAssetsByCategory)

module.exports = router;