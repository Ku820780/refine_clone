const mongoose = require('mongoose')

const addnewcontactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    title:{
        type: String,
        require: true
    },
    company:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default:"Inactive"
    },
}, {timestamps: true})

module.exports = mongoose.model('Newcotact', addnewcontactSchema)

