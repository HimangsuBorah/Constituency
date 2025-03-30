// src/auth/routes/authRoutes.js
const express = require('express');
const houseDataController = require('../controller/housedataController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');




const router = express.Router();

router.post('/add-booth',houseDataController.addboothDataController);
router.post('/add-panchayat',houseDataController.addpanchayatDataController)
router.get('/getbooth/:id',houseDataController.getBoothByIdController)
router.get('/getpanchayat/:id',houseDataController.getPanchayatByIdController)
router.get('/getallpanchayat',houseDataController.getAllPanchayatController)
router.get('/getallbooth',houseDataController.getAllBooth)
router.post('/addheadmember',isAuthenticated,houseDataController.addHeadController)
router.post('/addmember/:id',isAuthenticated,houseDataController.addFamilyMember)
router.get('/getfamilydetails/:id',houseDataController.getFamilyDetailsByLeader)
router.get('/getallzpc',houseDataController.getAllZpcController)
router.get('/get-panchayat-by-zpc/:id',houseDataController.getPanchayatByZPCController)
router.get('/get-village-by-panchayat/:id',houseDataController.getVillageByPanchayatController)


module.exports = router;