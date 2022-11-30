const express = require('express')
const goalRouter = express.Router()
const { getGoals, createGoals, updateGoals, deleteGoals } = require('../controllers/goalsController')



//Read route 
goalRouter.get('/', getGoals)

//Create Route
goalRouter.post('/', createGoals )

//Update route
goalRouter.put('/:id', updateGoals)

//Delete route
goalRouter.delete('/:id', deleteGoals)

module.exports = goalRouter