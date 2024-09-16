const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile:{
        type: String
    }
    
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)