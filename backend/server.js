const express = require('express');
const { errohandler } = require('./middleware/errorMiddleware');
require('dotenv').config()
const db = require('./config/dbConfig')

const goalRouter = require('./routes/goalroutes');
const userRouter = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000


const app = express()


app.use(express.json()) 
app.use(express.urlencoded({extended :true})) 

// Connecting Datatbase
db.connectToMongoDB() 

//setting middlewares
app.use('/api/goals', goalRouter) 
app.use('/users', userRouter)


app.use(errohandler)

app.listen(PORT, ()=>{
    console.log(`server listening on http://localhost:${PORT}`)
}) 