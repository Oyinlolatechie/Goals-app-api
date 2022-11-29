const { text } = require('body-parser')
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const goalSchema = new Schema ({
    text: {
        type: String,
        required: [true, "Please input a text"],
        trim: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Goal', goalSchema)