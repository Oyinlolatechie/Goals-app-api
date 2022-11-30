exports.signUp = (req, res) => {
    res.json({
        message : "createUser"
    })
}

exports.signIn = (req, res) => {
    res.json({
        message : "userLogin"
    })
}

exports.getUser = (req, res) => {
    res.json({
        message : "Here is the user details"
    })
}

