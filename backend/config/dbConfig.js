const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGO_DB

function connectToMongoDB () {
    mongoose.connect(MONGODB_URI)

    mongoose.connection.on('connected', async ()=>{
        console.log("MongoDb connected successfully")
    })

    mongoose.connection.on('error', (error)=>{
        console.log("Connection to MongoDB failed", error)
    })
}


module.exports = {connectToMongoDB}