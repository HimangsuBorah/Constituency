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




module.exports = router;