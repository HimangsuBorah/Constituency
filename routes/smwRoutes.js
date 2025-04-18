// src/auth/routes/authRoutes.js
const express = require('express');
const smwController = require('../controller/smwController');
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

router.post('/createtask',isAuthenticated,smwController.createTaskController)
router.get('/gettask/:taskid',smwController.getTaskByIdController)
router.get('/all-tasklist',smwController.getAllTaskListController)
router.get('/tasklistByStatus',smwController.getTaskListByStatus)
router.put('/updatetask/:taskid',smwController.updateTaskController)
router.delete('/delete-task/:taskid',smwController.deleteTaskController)
router.post('/create-submission/:taskid',smwController.createSubmission)
router.get('/get-submission/:id',smwController.getSubmissionById)
router.put('/review-submission/:id',isAuthenticated,smwController.reviewSubmissionController)
router.post('/upload-submission-image/:id',upload.array('images', 10), smwController.uploadSubmissionImagesController);
router.post('/create-task-category',smwController.createTaskCategory)
router.delete('/delete-submission/:id',smwController.deleteSubmissionController)
router.post('/get-submissions-by-taskid/:id',smwController.getAllSubmissionByTaskIdController)
router.post('/get-all-smw-accounts',smwController.getAllSmwAccounts)

module.exports = router;