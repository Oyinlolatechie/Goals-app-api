const express = require ('express')
const { signUp, signIn, getUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const userRouter = express.Router()


//sign up route (create user)
userRouter.post('/', signUp)

//login route (login to already created user)
userRouter.post('/login', signIn)

//Get user
userRouter.get('/user', protect, getUser)


module.exports = userRouter