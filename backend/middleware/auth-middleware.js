const tokenService = require("../services/token-service");

module.exports = async function(req,res,next){
    try{
        const { accessToken } = req.cookies;
        console.log(accessToken);
        if(!accessToken){
            return res.status(401).json({message:'Expired session'});
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        
        if(!userData) {
            throw new Error();
        }
        req.user = userData;
        console.log(req.user._id);
        next();
    }catch(err){
        return res.status(401).json({message: 'Invalid token'});
    }
}
