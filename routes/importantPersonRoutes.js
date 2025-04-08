// src/auth/routes/authRoutes.js
const express = require('express');
const importantPersonController = require('../controller/importantPersonController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');




const router = express.Router();

router.post('/add-importantperson',isAuthenticated,importantPersonController.createImportantPersonController);
router.get('/getall-importantperson',importantPersonController.getAllImportantPerson)
router.get('/get-importantperson-byid/:id',importantPersonController.getImportantPersonById)
router.get('/get-important-person-by-village/:villageid',importantPersonController.getImportantPersonByVillage)



module.exports = router;