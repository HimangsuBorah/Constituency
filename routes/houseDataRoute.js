// src/auth/routes/authRoutes.js
const express = require('express');
const houseDataController = require('../controller/housedataController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');




const router = express.Router();

router.post('/add-booth',isAuthenticated,houseDataController.addboothDataController);
router.post('/add-panchayat',isAuthenticated,houseDataController.addpanchayatDataController)
router.get('/getbooth/:id',isAuthenticated,houseDataController.getBoothByIdController)
router.get('/getpanchayat/:id',isAuthenticated,houseDataController.getPanchayatByIdController)
router.get('/getallpanchayat',isAuthenticated,houseDataController.getAllPanchayatController)
router.get('/getallbooth',isAuthenticated,houseDataController.getAllBooth)
router.post('/addheadmember',isAuthenticated,houseDataController.addHeadController)
router.post('/addmember/:id',isAuthenticated,houseDataController.addFamilyMember)
router.get('/getfamilydetails/:id',houseDataController.getFamilyDetailsByLeader)
router.get('/getallzpc',isAuthenticated,houseDataController.getAllZpcController)
router.get('/get-panchayat-by-zpc/:id',isAuthenticated,houseDataController.getPanchayatByZPCController)
router.get('/get-village-by-panchayat/:id',isAuthenticated,houseDataController.getVillageByPanchayatController)
router.get('/get-panchayat-by-village/:id',isAuthenticated,houseDataController.getPanchayatByVillage)


module.exports = router;