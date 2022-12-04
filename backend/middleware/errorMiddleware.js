// exports.errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode ? res.statusCode : 500

//     res.status(statusCode)
    
//     res.json({
//         message: err.message || "A server error occured",
//         stack : process.env.NODE_ENV === 'production' ? null : err.stack
//     })
// }

exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || "Server error occured"

    return res.status(statusCode).json({
        status : "Failed", 
        message : message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}