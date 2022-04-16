const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middelware')
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
     
    return response.status(200).json(blogs)    
    
  })
  
  blogsRouter.post('/', userExtractor, async (request, response) => {
    // console.log( request.token )
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("l",request)
  if (!request.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
    
    try { const users =  await  User.findById(request.id)
      console.log("li")
    const blog = new Blog(request.body)
    blog.user = users._id
    saved_blog = await blog.save()
    users.blogs = users.blogs.concat(saved_blog._id)
    saved_user = await users.save()

    return response.status(201).json(saved_blog)
      
    }
    catch (error) {
     response.status(400).json(error.message,"li")
      
    }

     
  })
  blogsRouter.delete('/delete/:id', userExtractor, async  (request, response) => {
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(request.id)
  if ( !request.id ) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
    try {
    deleted_blog  = await Blog.findById(request.params.id)
    
    if (deleted_blog.user._id.toString() === request.id.toString()){
      deleted_blog = await Blog.remove(deleted_blog)
      const user =  await  User.findById(request.id)
     // console.log( user.blogs.filter(id => id.toString() !== request.params.id.toString()))
      user.blogs = user.blogs.filter(id => id.toString() !== request.params.id.toString())
      saved_user = await user.save()
      response.status(200).json({saved_user})}
    else {
      response.status(400).send("Wrong user")
 
    }
    } catch (error) {
          response.status(400).json(error.message)

    } 
  })
  blogsRouter.patch('/like/:id',async  (request, response) => {
    try {
    let blog = await Blog.findById(request.params.id)
    console.log(typeof(request.params.id))
    blog.likes = blog.likes + 1
    saved_blog = await blog.save()
    response.status(201).json(saved_blog)
    } catch (error) {
      response.status(400)    } 

  })
  blogsRouter.patch('/comment/:id',async  (request, response) => {
    try {
      let blog = await Blog.findById(request.params.id)
      //console.log(typeof(request.params.id))
      blog.comments = blog.comments.concat(request.body.comment)
      saved_blog = await blog.save()
      response.status(201).json(saved_blog)
      } catch (error) {
        response.status(400)    } 
  
    
  })
  
module.exports = blogsRouter