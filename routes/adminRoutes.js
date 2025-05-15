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

router.get('/get-user-by-boothid/:boothid',isAuthenticated,adminController.getUserByBoothId);

router.get('/get-nonverified-households/:userid',isAuthenticated,adminController.getNonVerifiedHouseholdByUserId)

router.get('/get-verified-households/:id',isAuthenticated,adminController.getVerifiedHouseholdByUserId)

router.put('/update-member-details/:id',isAuthenticated,adminController.updateMemberController)

router.put('/verify-household/:id',isAuthenticated,adminController.verifyMemberBYHousehold)

router.post('/get-all-household',isAuthenticated,adminController.getAllHouseholdDetailsController)
router.delete('/delete-member/:id',isAuthenticated,adminController.deleteMemberById)
router.delete('/delete-household/:id',isAuthenticated,adminController.deleteHouseholdByHeadid)
router.post('/get-total-verified-projects-by-user',isAuthenticated,isAuthenticated,adminController.totalVerifiedProjectsByUser)
router.post('/get-total-verified-members-by-user',isAuthenticated,adminController.totalVerifiedMembersByUser)
router.post('/get-verified-developementprojects-by-category/:id',isAuthenticated,adminController.getAllVerifiedProjectsByCategory)
router.post('/get-notverified-developementprojects-by-category/:id',isAuthenticated,adminController.getAllNotVerifiedProjectsByCategory)
router.post('/get-all-verified-projects',isAuthenticated,adminController.totalVerifiedDevelopementProjects)
router.post('/get-all-not-verified-projects',isAuthenticated,adminController.totalNotVerifiedDevelopementProjects)
router.put('/update-project-details/:id',isAuthenticated,adminController.updateProjectDetails)
router.put('/verify-project/:id',isAuthenticated,adminController.verifyProject)
router.delete('/delete-project-byid/:id',isAuthenticated,adminController.deleteProjectByIdController)
router.get('/get-project-by-id/:id',isAuthenticated,adminController.getProjectById)

router.post('/get-all-notverified-assets',isAuthenticated,adminController.getAllNotVerifiedAssetsByUser)
router.post('/get-all-verified-assets',isAuthenticated,adminController.getAllVerifiedAssetsByUser)
router.delete('/delete-asset-by-id/:id',isAuthenticated,adminController.deleteAssetByIdController)
router.put('/update-asset-by-id/:id',isAuthenticated,adminController.updateAssetDetailsController)
router.put('/verify-asset/:id',isAuthenticated,adminController.verifyAssetDetailsController)
router.post('/all-developement-categories',isAuthenticated,adminController.getAllCategories)

router.post('/get-all-community-groups-by-status',isAuthenticated,adminController.getAllCommunityGroups)
router.put('/verify-community-group/:id',isAuthenticated,adminController.verifyCommunityGroup)
router.put('/update-community-group-member/:id',isAuthenticated,adminController.updateCommunityMemberDetails)
router.delete('/delete-community-group-member/:id',isAuthenticated,adminController.deleteCommunityGroupMembers)

router.get('/get-user-leaderboard',adminController.userleaderBoard)

module.exports = router;