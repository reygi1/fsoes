const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response, next) => {
  
  const blogs = await Blog  
  .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
  })
  

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(request.token === null){
     response.status(401).end()
  }
  else {

  const user = await User.findById(request.token.id)

  
    const blog= new Blog ({
      likes: body.likes,
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
    }

  })

blogsRouter.delete('/:id', async (request, response, next) => {
  
  const user = await User.findById(request.token.id)
  const blog = await Blog.findById(request.params.id)

  if(user._id.toString() === blog.user.toString())
  {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    response.status(401).end()
  }
  
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog=  {
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)

  response.json(updatedBlog.toJSON())

  
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog=  {
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)

  response.json(updatedBlog.toJSON())

  
})



module.exports = blogsRouter