 const bcrypt = require('bcrypt');
 const mongoose = require('mongoose')
 const UserRouter = require('express').Router()
 const User = require('../models/user');

UserRouter.get('/',async(request,response)=>{
    const users = await User.find({}).populate('blogs', {url:1 , title:1 , author: 1})
        response.json(users)
})

UserRouter.get('/:id',async(request,response)=>{
    const { id } = request.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return response.status(400).send({ error: 'Invalid ID format' });
      }
    
      try {
          const user = await User.findById(id);
          if (!user) return response.status(404).send({ error: 'User not found' });    
          response.status(200).send(user);
      } catch (error) {
          response.status(500).send({ error: 'Server error' });
      }
})

UserRouter.put('/:id', async (request,response)=>{
    
    const userId = request.params.id
    await User.findByIdAndUpdate(userId)
    const users = new User({
        username: request.body.username,
        name: request.body.name,
        hashedpasword : request.body.password,
   })
    const savedUser = await users.save()

    response.status(201).json(savedUser)
})

UserRouter.delete('/:id', async ( request, response)    =>{

    await User.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

 UserRouter.post('/', async (request, response)=>{
     const {username, name, password} = request.body
     try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ error: 'expected `username` to be unique' });
        }

     const saltRounds = 10;
     const passwordH = await bcrypt.hash(password,saltRounds)
        try{
     const user= new User({
         username,
         name,
         passwordH,
    })
        await user.save();
        return response.status(201).json(user);
      } catch (error) {
        console.error('Error creating user:', error);  
        return response.status(500).json({ error: 'Something went wrong' });
      }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'An error occurred while creating the user' });
      }
})


 module.exports = UserRouter;
