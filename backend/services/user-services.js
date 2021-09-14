const UserModel = require('../models/user-models');

class UserService {
    async findUser(filter){
        const user = await UserModel.findOne({filter}).then(()=>{
        }).catch(err => console.log(err));
        return user;
    }
    async createUser(data){

        const user = await new UserModel({
            phone:data,
            activated: false,
        });

        user.save().then(()=>{
            console.log("Success!");
        }).catch(err => console.log(err));
        return user;
    }
}

module.exports = new UserService();