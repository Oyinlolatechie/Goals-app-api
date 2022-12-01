const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

//@desc sign up
//@route POST /users
//@access Public
exports.signUp = asyncHandler (async (req, res) => {

    const { firstname, lastname, username, email, password } = req.body

    //verify user' input
    if(!email || !username || !password) {
        res.status(400).json("please enter all fields")
    }

    //confirm if user already exist
    const userExists = await userModel.findOne({email})
    if(userExists) {
        res.status(400).json("Email already exists!")
    } 

    //hash inputted password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await userModel.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword
    })

    if(!user){
        res.status(400)
        throw new Error("Invalid user data inputted")
    } 

    res.status(200).json({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        username : req.body.username,
        email : req.body.email
    })
})

//@desc Sign in
//@route POST /users/login
//@access Public
exports.signIn = asyncHandler ( async (req, res) => {
    res.json({
        message : "userLogin"
    })
})


//@desc Get user
//@route GET /home
//@access Private
exports.getUser = asyncHandler (async (req, res) => {
    res.json({
        message : "Here is the user details"
    })
})

