const mongoose = require('mongoose')

const Database = async () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=> console.log('MongoDB connection error:', err))
}

module.exports = Database;