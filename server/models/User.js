const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    }, 
    email : {
        type : String,
        required: true,
        unique: true,
    },
    profilePhotoUrl : {
        type : String,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('users', user);
module.exports = User;