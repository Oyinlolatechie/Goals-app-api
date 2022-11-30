const { text } = require('body-parser')
const mongoose = require('mongoose')
const objectId = mongoose.Schema.ObjectId


const Schema = mongoose.Schema


const goalSchema = new Schema ({
    user: {
        type : objectId,
        required: true,
        ref:  "User"

    },
    text: {
        type: String,
        required: [true, "Please input a text"],
        trim: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Goal', goalSchema)