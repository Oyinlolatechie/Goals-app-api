const asyncHandler = require('express-async-handler')

//@desc Get goals
//@route GET /home
//@access 
exports.getGoals = asyncHandler(async (req, res)=> {
    console.log("Hello")
    res.status(201).json({
        status : "success",
        message : "Get Goal"
    })
})


//@desc set goals
//@route POST /home
//@access 
exports.createGoals =  asyncHandler(async (req, res)=> {
    if(!req.body.text){
    res.status(400)
    throw new Error("Please add a text")
   }
   
  
   res.status(201).json({"message": "Hello"})
})


//@desc update goals
//@route PUT /home/:id
//@access
exports.updateGoals = asyncHandler(async (req, res)=>{
    console.log("Hello")
    res.status(200).json({
        status : "success",
        message : "Update Goals"
    })
})


//@desc delete goals
//@route DELETE  /home/:id
//@access
exports.deleteGoals =  asyncHandler(async (req, res)=>{
    console.log("Hello")
    res.status(200).json({
        status : "success",
        message : "Delete Goals"
    })
})