const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/',async (request, response) =>{

    const {username, password} = request.body

    const user = await User.findOne({username})
    console.log("The user is ", user);

    if (!user) {
        return response.status(401).json({
            error: 'User not found'
        })
    }

    // Compare password with the hashed password stored in the database
    const correctPassword = await bcrypt.compare(password, user.passwordH) // Adjust if your field is different

    if (!correctPassword) {
        return response.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const sessionToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign( sessionToken, process.env.SECRET)
    response
        .status(200)
        .send({token, username: user.username, name: user.name})
})
module.exports = loginRouter