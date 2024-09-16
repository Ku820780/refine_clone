const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const Database = require('./utils/db.js')
const cookies = require('cookie-parser')
const userRoute = require('./route/user.route.js')
const companyRouter = require('./route/company.route.js')
const eventRouter = require('./route/event.route.js')
dotenv.config({})
const app = express()

app.use(express.json())
app.use(cookies())
// PORT
const PORT = process.env.PORT || 5800;
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['POST', 'PUT', 'GET', 'DELETE'],
    credentials:true,
}))

//api's
app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRouter)
app.use('/api/vi/event', eventRouter)


app.use(express.static('Public'))
app.listen(PORT, ()=>{
    Database()
    console.log(`Server runing on ${PORT}`)
})

