const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/userModel')


//@desc sign up
//@route POST /users
//@access Public
exports.signUp = asyncHandler (async (req, res) => {

    const { firstname, lastname, username, email, password } = req.body

    //verify user' input
    if(!email || !username || !password) {
        res.status(400)
        throw new Error("please enter all fields")
    }

    //confirm if user already exist
    const userExists = await userModel.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error ("Email already exists!")
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
    
    if(user){
        res.status(200).json({
            _id : user.id,
            firstname : user.firstname,
            lastname : user.lastname,
            username : user.username,
            email : user.email,
            token : generateToken(user.id)
        })
    
    } else {
        res.status(400)
        throw new Error("Invalid user data inputted")
    } 
})

//@desc Sign in
//@route POST /users/login
//@access Public
exports.signIn = asyncHandler ( async (req, res) => {
    const { email, password } = req.body

      //verify user' input
    if(!email || !password) {
        res.status(400)
        throw new Error("please enter all fields")
    }

    //check if email exist 
    const user = await userModel.findOne({email})

    if(!user){
        res.status(400)
        throw new Error("User not found")
    }

      //check password 
    if(user && (await bcrypt.compare(password, user.password))) {
     
      res.status(200).json({
          _id : user.id,
          firstname : user.firstname,
          lastname : user.lastname,
          username : user.username,
          email : user.email,
          token : generateToken(user._id)
      })
    } else {
        res.status(400)
        throw new Error("user not found") 
    }
})


//@desc Get user
//@route GET /home
//@access Private
exports.getUser = asyncHandler (async (req, res) => {
   const { _id, email, username } = await userModel.findById(req.user.id)

   res.status(200).json({
    id : _id,
    email : email,
    username : username
   })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn :'30d'})
}