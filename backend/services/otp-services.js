const crypto = require('crypto');
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const hashService = require('./hash-services');

const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});



// let otp; 
class OtpService {
    async generateOtp() {
        const otp = await crypto.randomInt(1000, 9999);
        return otp;
    }
    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your OTP is ${otp}`
        });
    }
    sendByMail() {

    }
    async verify(hashedOtp, data) {
        try {
            const computedHash = await hashService.hashOtp(data);
            console.log(computedHash);
            return computedHash === hashedOtp;
        } catch (error) {
            console.log(error);
        }
        console.log(hashedOtp);
    }
}

module.exports = new OtpService();