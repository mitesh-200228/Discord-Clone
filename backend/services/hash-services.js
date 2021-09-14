const crypto = require('crypto'); 

class HashService {
    async hashOtp(data) {
        const x = crypto.createHmac('sha256',process.env.HASH_KEY).update(data).digest('hex');
        return x;
    }
}

module.exports = new HashService();  