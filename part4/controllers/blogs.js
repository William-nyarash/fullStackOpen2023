const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blogs')
const User = require('../models/user')
const info = require('../utils/logger')
const jwt = require('jsonwebtoken')
const blogs = require('../models/blogs')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/',async(request,response)=>{
    const blogs = await Blog.find({}).populate('user',{username:1, name: 1})
        response.json(blogs)
})

blogRouter.get('/:id',async(request,response)=>{
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ error: 'Invalid ID format' });
  }

  try {
      const blog = await Blog.findById(id);
      if (!blog) return response.status(404).send({ error: 'Blog not found' });

      response.status(200).send(blog);
  } catch (error) {
      response.status(500).send({ error: 'Server error' });
  }
})
blogRouter.post('/',userExtractor, async (request, response) => {
  try {
    const { title, author, url } = request.body

    if (!title || !url) {
      return response.status(400).json({ error: 'Title and url are required' })
    }

   const users = request.user

    if (!users.id) {
      return response.status(401).json({ error: 'Token invalid' })
    }


    const user = await User.findById(users.id)
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }


    const blogs = new Blog({ title, author, url, user: user.id })
    const savedBlog = await blogs.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()


    response.status(201).json(savedBlog)

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'An error occurred while processing your request' })
  }
});

blogRouter.delete('/:id', userExtractor,async (request, response) => {
  const user = request.user
  try {
    const blog = await Blog.findById(request.params.id);
    
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    if ( !blog.user || blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'Unauthorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();  

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'An error occurred while deleting the blog' });
  }
});

blogRouter.put('/:id',async (request,response)=>{
    const body= request.body
    const id = request.params.id

    const blogs = {
        title:body.title,
        author:body.author,
        url:body.url
    }
   const updatedBlog = await  Blog.findByIdAndUpdate(id,blogs,{new:true})
   response.status(200).json(updatedBlog)
})

module.exports = blogRouter
