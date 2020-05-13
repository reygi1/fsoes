const commentRouter = require('express').Router()
const Comment = require('../models/comments')


commentRouter.get('/comments', async (request, response, next) => {
  
    const comments = await Comment.find({})
  
    response.json(comments.map(comment => comment.toJSON()))
    })



commentRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body
  
  
    console.log(body);
    const content = body.content
    const blogId = request.params.id
    const comment = new Comment({
      content,
      blogId 
    })
    
      const savedComment = await comment.save()
  
      response.json(savedComment.toJSON())
      
  
    })
  
    module.exports = commentRouter