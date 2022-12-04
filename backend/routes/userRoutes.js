const express = require ('express')
const { signUp, signIn, getUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const userRouter = express.Router()


//sign up route (create user)
userRouter.post('/', signUp)

//login route
userRouter.post('/login', signIn)

//Sign in route
userRouter.get('/user', protect, getUser)


module.exports = userRouter