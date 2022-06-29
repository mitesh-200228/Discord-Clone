require('dotenv').config();
const mongoose = require('mongoose');

function DBconnect() {
    const DB_URL = process.env.DB_URL;
    
    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }).then(() => {
        console.log("Connection successfully");
    }).catch(err => console.log("Something went wrong"));

}

module.exports = DBconnect;