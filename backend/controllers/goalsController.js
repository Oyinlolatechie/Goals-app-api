const asyncHandler = require('express-async-handler')
const goalModel = require('../models/goalsModel')

//@desc Get goals
//@route GET /home
//@access Public
exports.getGoals = asyncHandler(async (req, res)=> {

    const goals = await goalModel.find()
   
    res.status(201).json({
        status : "success",
        message : goals
    })
})


//@desc set goals
//@route POST /home
//@access Private
exports.createGoals =  asyncHandler(async (req, res)=> {
    if(!req.body.text){
    res.status(400)
    throw new Error("Please add a text")
   }
   
  const goalToCreate = req.body
  const goal = await goalModel.create(goalToCreate)
   res.status(201).json({
    status : "success",
    message : goal
})
})


//@desc update goals
//@route PUT /home/:id
//@access
exports.updateGoals = asyncHandler(async (req, res)=>{

    const id = req.params.id

    const goalToUpdate = await goalModel.findById(id)
    if(!goalToUpdate){
        res.status(404)
        throw new Error("Goal not found")
    }

    const update = req.body

    const updatedGoal = await goalModel.findByIdAndUpdate(id, update, {new: true,} )
    res.status(200).json({
        status : "success",
        message : updatedGoal
    })
})


//@desc delete goals
//@route DELETE  /home/:id
//@access
exports.deleteGoals =  asyncHandler(async (req, res)=>{

    const id = req.params.id 

    const goalToDelete = await goalModel.findById(id)

    if(!goalToDelete){
        res.status(400)
        throw new Error("Goal to delete, does not exist")
    }

   await goalToDelete.remove()
    res.status(204).json()
})