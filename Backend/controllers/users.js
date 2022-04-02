const bcrypt = require('bcryptjs');
const User = require('../models/user')
userRouter = require('express').Router()
userRouter.post('/', async (request, response) => {
    const {name,email,password} = request.body
    const dupUser = await User.findOne({name})
    if (name.length<3 || password.length < 3 || dupUser){
        return response.status(400).send("Nothing")

    }
    const saltRounds = 9
    const passHash = await bcrypt.hash(password , saltRounds)
    const user = new User({
        name,
        email,
        password:passHash
    })
    const savedUser = await user.save()
   return  response.status(201).json(savedUser)
  })

  userRouter.get('/', async(request, response) => {

    const users = await User.find({}).populate('blogs')
    if (users)
    return response.json(users)
    else
    return response.status(400).send("Nothing")
    
  })
  module.exports = userRouter