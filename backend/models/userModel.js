const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    firstname : {
        type: String,
        required : [true, "Please enter your First Name"],
        trim: true
    },
    
    lastname : {
        type: String,
        required : [true, "Please enter your Last Name"],
        trim: true
    },

    username : {
        type: String,
        required : [true, "Please choose a username"],
        trim : true
    },
    
    email : {
        type: String,
        required : [true, "Please enter your E-mail"],
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required : [true, "Please enter a Password"],
        trim: true
    },
}, {
    timestamps : true
})


const User = mongoose.model("User", userSchema)
module.exports = User


