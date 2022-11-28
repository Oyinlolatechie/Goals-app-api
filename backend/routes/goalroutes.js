const express = require('express')
const router = express.Router()
const { getGoals, createGoals, updateGoals, deleteGoals } = require('../controllers/goalsController')



//Read route 
router.get('/', getGoals)

//Create Route
router.post('/', createGoals )

//Update route
router.put('/:id', updateGoals)

//Delete route
router.delete('/:id', deleteGoals)

module.exports = router