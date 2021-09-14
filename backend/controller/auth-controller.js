const OtpService = require('../services/otp-services');
const hashService = require('../services/hash-services');
// const otpServices = require('../services/otp-services');
const userService = require('../services/user-services');
const tokenService = require('../services/token-service');
const UserModel = require('../models/user-models');
const DBconnect = require('../database');
const UserDto = require('../dtos/user-dtos');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ message: 'Enter Phone-Number' });

        const otp = await OtpService.generateOtp();
        const ttl = 1000*60*60;
        const expires = Date.now() + ttl;

        const data = `${otp}.${phone}.${expires}`;
        const hash = await hashService.hashOtp(data);

        //send otp message
        try{
            // await OtpService.sendBySms(phone,otp);
            return res.json({ 
                hash: `${hash}.${expires}`,
                phone:phone,
                otp:otp
            });
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Something Went Wrong'});
        }

        res.json({hash: hash});
    }
    async verifyOtp(req, res) {
        DBconnect();
        const {otp,hash,phone} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({ message: 'All fields are required' });
        }

        const [hashedOtp,expires] = hash.split('.');
        if(Date.now() > +expires){
            res.status(400).json({message:'OTP expired'});
        }

        const data = `${otp}.${phone}.${expires}`;
        const isValid = await OtpService.verify(hashedOtp,data);
        console.log(isValid);
        if(!isValid){
            res.status(400).json({message: 'Invalid OTP or session timeout'});
        }

        let user;
 
        try {
            user = await userService.findUser({phone: phone});
            if(!user){
                user = await userService.createUser(phone);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'DataBase Error'});
        }

        //Token  
        const {accessToken, refreshToken} = tokenService.generateAccessToken({_id:user.id,activated:false});

        await tokenService.storeRefreshToken(refreshToken,user._id);

        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000*60*60*24*30,
            httpOnly: true,
        });

        res.cookie('accessToken',accessToken,{
            maxAge: 1000*60*60*24*30,
            httpOnly: true,
        });        

        const userDto = new UserDto(user);
        res.json({accessToken,user:userDto});
    }
}    

module.exports = new AuthController();