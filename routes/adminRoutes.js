// src/auth/routes/authRoutes.js
const express = require('express');
const adminController = require('../controller/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


// @basePath /api/auth

const router = express.Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: user
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               booth_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */

router.get('/get-user-by-boothid/:boothid', adminController.getUserByBoothId);

router.get('/get-nonverified-households/:userid',adminController.getNonVerifiedHouseholdByUserId)

router.get('/get-verified-households/:id',adminController.getVerifiedHouseholdByUserId)

router.put('/update-member-details/:id',adminController.updateMemberController)

router.put('/verify-household/:id',isAuthenticated,adminController.verifyMemberBYHousehold)

router.post('/get-all-household',adminController.getAllHouseholdDetailsController)
router.delete('/delete-member/:id',adminController.deleteMemberById)
router.delete('/delete-household/:id',adminController.deleteHouseholdByHeadid)
router.post('/get-total-verified-projects-by-user',isAuthenticated,adminController.totalVerifiedProjectsByUser)
router.post('/get-total-verified-members-by-user',isAuthenticated,adminController.totalVerifiedMembersByUser)
router.post('/get-verified-developementprojects-by-category/:id',adminController.getAllVerifiedProjectsByCategory)
router.post('/get-notverified-developementprojects-by-category/:id',adminController.getAllNotVerifiedProjectsByCategory)
router.post('/get-all-verified-projects',adminController.totalVerifiedDevelopementProjects)
router.post('/get-all-not-verified-projects',adminController.totalNotVerifiedDevelopementProjects)
router.put('/update-project-details/:id',adminController.updateProjectDetails)
router.put('/verify-project',adminController.verifyProject)

module.exports = router;