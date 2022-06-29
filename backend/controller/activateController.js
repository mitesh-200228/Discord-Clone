const DBconnect = require('../database');
const Jimp = require('jimp');
const { AUTO } = require('jimp');
const path = require('path');
const userServices = require('../services/user-services');
const UserDto = require('../dtos/user-dtos');
const userModel = require('../models/user-models');

class activateController {
    async activate(req, res) {
        const { name, avatar } = req.body;
        if (!name || !avatar) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }
        //data:image/jpeg;base64,
        const buffer = Buffer.from(avatar.replace(/^data:image\/(jpeg|png|jpg);base64,/, ''), 'base64');
        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
        try {
            const jimResp = await Jimp.read(buffer);
            jimResp.resize(150, AUTO).write(path.resolve(__dirname, `../store/${imagePath}`));
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Could not process the image' });
        }

        try {
            const user = await userModel.findOne({ _id: req.user._id });
            if (!user) return res.status(404).json({ message: 'User Not Found!!!' });
            user.activated = true;
            user.name = name;
            user.avatar = `/store/${imagePath}`;
            await user.save();
            return res.status(200).json({user: new UserDto(user)})
        } catch (err) {
            console.log(err);
        }

        res.json({ message: 'OK' });
    }
}

module.exports = new activateController();