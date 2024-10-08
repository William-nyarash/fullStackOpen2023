const blogRouter = require('express').Router()
const { request, response } = require('express')
const blog = require('../models/blogs')

blogRouter.get('/',async(request,response)=>{
    const blogs = await blog.find({})
        response.json(blogs)
})

blogRouter.get('/:id',(request,response,next)=>{
    blog.findById(request.params.id)
        .then(blog=>{
            if(blog){
                response.json(blog)
            }else{
                response.status(404).end()
            }
        })
        .catch(error=>{
            next(error)
        })
})

blogRouter.post('/',(request,response,next)=>{
    const body = request.body

    const blogs = new blog({
        title:body.title,
        author:body.author,
        url:body.url
    })
    blogs.save()
    .then( savedBlog =>{
        response.json(savedBlog)
    })
    .catch(error=> next(error))
})

blogRouter.delete('/:id',(request,response, next)=>{
    blog.findByIdAndDelete(request.params.id)
    .then(()=>{
        response.status(204).end()
    })
    .catch(error =>next(error))
})

blogRouter.put('/:id',(request,response,next)=>{
    const body= request.body
    const id = request.params.id

    const blogs = {
        title:body.title,
        author:body.author,
        url:body.url
    }

    blog.findByIdAndUpdate(id,blogs,{new:true})
    .then(updatedBlog =>{
        response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter