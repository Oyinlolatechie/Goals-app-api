const express = require('express')
const goalRouter = express.Router()
const authenticate = require('../middleware/authMiddleware')
const { getGoals, createGoals, updateGoals, deleteGoals } = require('../controllers/goalsController')



//Read route 
goalRouter.get('/', authenticate, getGoals)

//Create Route
goalRouter.post('/', authenticate, createGoals )

//Update route
goalRouter.put('/:id', authenticate, updateGoals)

//Delete route
goalRouter.delete('/:id', authenticate, deleteGoals)

module.exports = goalRouter