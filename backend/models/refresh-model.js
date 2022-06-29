const mongoose = require('mongoose');

const refreshSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    userId:{
        type: String,
        ref: 'User',
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('Refresh',refreshSchema,'tokens');