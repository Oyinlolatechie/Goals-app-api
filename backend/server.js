
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config()
const db = require('./config/dbConfig')

//Routes
const goalRouter = require('./routes/goalroutes');
const userRouter = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000


const app = express()


app.use(express.json()) 
app.use(express.urlencoded({extended :true})) 

// Connecting Datatbase
db.connectToMongoDB() 

//setting routes
app.use('/api/goals', goalRouter) 
app.use('/users', userRouter)

//Home routes
app.get('/', (req, res) => {
    res.status(200).json({
        status : "success",
        message : "Welcome home"
    })
})

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`server listening on http://localhost:${PORT}`)
}) 