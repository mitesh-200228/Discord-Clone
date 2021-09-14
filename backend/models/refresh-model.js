const mongoose = require('mongoose');

const refreshSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    userId:{
        type: Object,
        ref: 'User',
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('Refresh',refreshSchema,'tokens');