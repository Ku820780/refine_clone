const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        require: true
    },
    salary:{
        type: String,
        required: true
    },
    companyLogo:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Company', companySchema)

