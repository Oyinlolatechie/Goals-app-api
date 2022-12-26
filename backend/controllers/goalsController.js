const asyncHandler = require('express-async-handler')
const goalModel = require('../models/goalsModel')
const userModel = require('../models/userModel')

//@desc Get goals
//@route GET /api/goals
//@access Public
exports.getGoals = asyncHandler(async (req, res)=> {
    
    const goals = await goalModel.find({user: req.user.id})
   
    res.status(201).json({
        status : "success",
        message : goals
    })
})


//@desc set goals
//@route POST /api/goals
//@access Private
exports.createGoals =  asyncHandler(async (req, res)=> {
    if(!req.body.text){
    res.status(400)
    throw new Error("Please add a text")
   }
   
  
  const goal = await goalModel.create({
    text: req.body.text,
    user: req.user.id
    })

   res.status(201).json({
    status : "success",
    message : goal
})
})


//@desc update goals
//@route PUT /api/goals:id
//@access
exports.updateGoals = asyncHandler(async (req, res)=>{

    const id = req.params.id

    const goalToUpdate = await goalModel.findById(id)
    if(!goalToUpdate){
        res.status(404)
        throw new Error("Goal not found")
    }

    //fecth for user with logged in user ID from user collection
    const user = await userModel.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found!");
    }

    //check if user.id matches with loggedin user ID 
    if( goalToUpdate.user.toString() !== user.id ){
        res.status(401)
        throw new Error('User not authorized to update goal')
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

    //get logged in user from db
    const user = await userModel.findById(req.user.id)

    if(!user){
        res.status(401);
        throw new Error("User not found")
    }

    //check if goal.user matches with logged in user.id
    if(goalToDelete.user.toString() !==  user.id) {
        res.status(401)
        throw new Error (`You're not authorized to delete this blog`)
    }

   await goalToDelete.remove()
    res.status(204).json()
})