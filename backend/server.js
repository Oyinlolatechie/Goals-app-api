const express = require('express');
const { errohandler } = require('./middleware/errorMiddleware');
require('dotenv').config()
const db = require('./config/dbConfig')

const router = require('./routes/goalroutes')

const PORT = process.env.PORT || 3000

console.log( "This is the PORT", PORT)
const app = express()


app.use(express.json()) 
app.use(express.urlencoded({extended :true})) 


db.connectToMongoDB() 
app.use('/home', router) 

app.use(errohandler)

app.listen(PORT, ()=>{
    console.log(`server listening on http://localhost:${PORT}`)
}) 