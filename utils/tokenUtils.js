require('dotenv').config();  
const jwt = require('jsonwebtoken')

const generateAccessTokens = (userId) => {

    
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET_KEY || 'default_secret_key',  // Default fallback secret key
        { expiresIn: process.env.JWT_EXPIRES_TIME || '1h' }  // Default expiration time
    );
    return  accessToken ;
};

const generateRefreshTokens =(userId)=>{
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET_KEY || 'default_refresh_secret_key',
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME || '7d' }
    );

    return refreshToken

}

module.exports ={generateAccessTokens,generateRefreshTokens}