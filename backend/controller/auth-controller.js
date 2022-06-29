const OtpService = require('../services/otp-services');
const hashService = require('../services/hash-services');
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
        const ttl = 1000 * 60 * 60;
        const expires = Date.now() + ttl;

        const data = `${otp}.${phone}.${expires}`;
        const hash = await hashService.hashOtp(data);

        //send otp message
        try {
            // await OtpService.sendBySms(phone,otp);
            return res.json({
                hash: `${hash}.${expires}`,
                phone: phone,
                otp: otp
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something Went Wrong' });
        }

        res.json({ hash: hash });
    }
    async verifyOtp(req, res) {
        DBconnect();
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired' });
        }

        const data = `${otp}.${phone}.${expires}`;
        const isValid = await OtpService.verify(hashedOtp, data);
        console.log(isValid);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP or session timeout' });
        }

        let user;

        try {
            user = await userService.findUser({ phone: phone });
            if (!user) {
                user = await userService.createUser(phone);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'DataBase Error' });
        }

        //Token  
        const { accessToken, refreshToken } = tokenService.generateAccessToken({ _id: user.id, activated: false });
        await tokenService.storeRefreshToken(refreshToken, user._id);

        try {
            await res.cookie('refreshToken', refreshToken, {
                expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
            });

            await res.cookie('accessToken', accessToken, {
                expiresIn: new Date(Date.now() + 1000 * 24 * 60 * 24),
                httpOnly: true,
            });
        } catch (error) {
            console.log(error);
        }

        const userDto = new UserDto(user);
        res.json({ accessToken, user: userDto });
    }
    async refresh(req, res) {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        let x;
        try {
            x = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        } catch (error) {
            return res.status(401).json({ message: 'Expired Token' });
        }
        // console.log(x);
        try {
            const token = await tokenService.findRefreshToken(x._id, refreshTokenFromCookie);
            if (!token) {
                return res.status(500).json({ message: 'Expired Token' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Interanal Server Error' });
        }

        const user = await UserModel.findById({ _id: x._id });
        if (!user) return res.status(404).json({ message: 'No User Found' });

        const { refreshToken, accessToken } = await tokenService.generateAccessToken({
            _id: x._id,
        });

        try {
            await tokenService.update(user._id,refreshToken);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Error' });
        }

        await res.cookie('refreshToken', refreshToken, {
            expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
        });

        await res.cookie('accessToken', accessToken, {
            expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.json({user:userDto,auth:true});
    } async logout(req,res){
        const {refreshToken} = req.cookies;
        await tokenService.removeToken(refreshToken);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user: null,auth:false});
    }
}

module.exports = new AuthController();