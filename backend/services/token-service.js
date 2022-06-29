const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET; 
const refreshModel = require('../models/refresh-model');

class TokenService {
    generateAccessToken(payload) {
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '20s'
        }); 
        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: '1y'
        });
        return {accessToken, refreshToken};
    }
    
    async storeRefreshToken(token,userId) {
        try{
            await refreshModel.create({
                token,
                userId,
            });
        }catch(err){
            console.log(err);
        }
    }

    async verifyAccessToken(token){
        return jwt.verify(token,accessTokenSecret);
    }

    async verifyRefreshToken(refreshToken){
        return jwt.verify(refreshToken,refreshTokenSecret);
    }

    async findRefreshToken(userId,refreshToken){
        try{
            // console.log(userId);
            // console.log(refreshToken);
            return await refreshModel.findOne({userId:`${userId}`,token:`${refreshToken}`});
        }catch(err){
            return res.status(500).json({message:'Intenal Error'});
        }
    }

    async update(userId,refreshToken){
        try{
            return await refreshModel.findOneAndUpdate({userId:userId},{token:refreshToken});        
        }catch(err){
            return res.status(500).json({message:'Intenal Error'});
        }
    }

    async removeToken(refreshToken) {
        return await refreshModel.deleteOne({token:refreshToken});
    }
}

module.exports = new TokenService();