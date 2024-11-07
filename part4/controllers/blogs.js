const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blogs')
const { request, response } = require('../app')
const blogs = require('../models/blogs')

blogRouter.get('/',async(request,response)=>{
    const blogs = await Blog.find({})
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
blogRouter.put('/:id',async(request,response)=>{
  const {title, author,like,url} = request.params

  blogs.findByIdAndUpdate()
})

blogRouter.post('/',async(request,response,next)=>{
        const {title, author,url} = request.body
    if (!title || !url) {
        return response.status(400).json({ error: 'Title and url are required' });
      }
    const blogs = new Blog({title, author, url})
    const savedBlog = await blogs.save()
    blogs.save()
    response.status(201).json(savedBlog)


})

blogRouter.delete('/:id',async(request,response)=>{
   await  Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

blogRouter.put('/:id',async (request,response)=>{
    const body= request.body
    const id = request.params.id

    const blogs = {
        title:body.title,
        author:body.author,
        url:body.url
    }

   await  Blog.findByIdAndUpdate(id,blogs,{new:true})
   response.json(updatedBlog)
})

module.exports = blogRouter