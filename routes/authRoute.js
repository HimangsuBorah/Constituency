// src/auth/routes/authRoutes.js
const express = require('express');
const authController = require('../controller/authController');
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

router.post('/register', authController.signupController);


router.post('/register',authController.signupController);
router.post('/login',authController.loginController)
router.post('/refreshtoken',authController.refreshTokenController)
router.get('/getuserbyId',isAuthenticated,authController.getUserByIdController)
router.put('/deleteaccount/:id',isAuthenticated,authController.disableUserController)
router.put('/deleteuser',authController.disableUserByForm)
router.put('/add-data-profile',authController.addDemographicDataController)
router.post('/register-as-smw/:id',isAuthenticated,authController.registerAsSMWController)


module.exports = router;