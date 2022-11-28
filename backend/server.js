const express = require('express');
const { errohandler } = require('./middleware/errorMiddleware');
const db = require('./config/dbConfig')
require('dotenv').config()

const router = require('./routes/goalroutes')

const PORT = process.env.PORT || 3000
const app = express()


app.use(express.text()) 
app.use(express.urlencoded({extended :true}))


db.connectToMongoDB()
app.use('/home', router) 

app.use(errohandler)

app.listen(PORT, ()=>{
    console.log(`server listening on http://localhost:${PORT}`)
}) 