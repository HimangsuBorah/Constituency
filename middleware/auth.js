const jwt = require('jsonwebtoken');
const  User  = require('../model/User'); // Adjust this path to your actual User model

// Authentication Middleware - isAuthenticated
const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log('Authorization Header:', authHeader);
    
    // Check if authHeader exists and follows "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token not found or invalid format' });
    }

    const accessToken = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
        // Verify the token and decode it
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

        // Attach token and user information to the request object
        req.accessToken = { value: accessToken, exp: decodedAccessToken.exp };
        
        // Fetch user from the database based on the decoded userId (ensure the JWT payload has the correct key)
        req.user = await User.findOne({ where: { id: decodedAccessToken.userId } });
       

        // If user is not found, return an error
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token expiration and other JWT errors
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Access token expired', code: 'AccessTokenExpired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Access token invalid', code: 'AccessTokenInvalid' });
        } else {
            // General error handling
            return res.status(500).json({ message: error.message });
        }
    }
};

// Authorization Middleware - isAdmin
const isAdmin = (...roles) => {
    return async (req, res, next) => {
        try {
            // Check if the user exists and fetch the role (userType)
            const user = req.user; // User info attached in `isAuthenticated`
            
            // If the user does not have the required role
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // Handle errors
            return res.status(500).json({ message: error.message });
        }
    };
};

module.exports = { isAuthenticated, isAdmin };