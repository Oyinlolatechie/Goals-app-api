const jwt = require ('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel')

const protect = asyncHandler(async( req, res, next ) => {

    let token  

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

      try {
        //get token from token
        token = req.headers.authorization.split(' ')[1]

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Get user from token
        req.user = await userModel.findById(decoded.id).select('-password')

        next()        
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Not authorized")
      }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})


module.exports = protect