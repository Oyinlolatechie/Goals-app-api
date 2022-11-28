const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://Oyinlola:MongoDBOyinlola2022@cluster0.tqhaya7.mongodb.net/?retryWrites=true&w=majority'

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