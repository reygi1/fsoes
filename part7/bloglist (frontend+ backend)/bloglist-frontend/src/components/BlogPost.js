import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeComments, createComment } from '../reducers/commentReducer'
import {useParams} from "react-router-dom"
import { likeBlog } from '../reducers/blogReducer'


const BlogPost = ({ blogs }) => {
    const comments = useSelector(state => state.comments)
    const id = useParams().id
    
  const dispatch = useDispatch()

    const blog = blogs.find(u => u.id === id)
    
  const handleLikeBlog = (bloga) => {
    
    dispatch(likeBlog(bloga.id, bloga))
    
  }

  useEffect(() => {
    dispatch(initializeComments())
    // eslint-disable-next-line
  }, [])

  
  const handleComment = (event) => {
    event.preventDefault()
        dispatch(createComment(id, {content: event.target.comment.value}))
        event.target.reset()
        
      }

  

  
       

    if (!blog) {
        return null
      }

      return( 
        <div>
            <h2>{blog.title} {blog.author} </h2>
          <a href={blog.url}>{blog.url}</a>
          <div className='likes'>{blog.likes} likes </div> <button  id="likeb" onClick={() => handleLikeBlog(blog)}>like</button>
          <div>added by {blog.user.name}</div>

          <h3>comments</h3>
          
        <form onSubmit={handleComment}>
          title:<input id="comment" name="comment"  />           
          <button type="submit">add comment</button>
        </form>
          <ul>
            {
            comments && comments.filter(c => c.blogId === id).map(d => 
                <li key={d.id}>{d.content}</li>
                
                )}
          
            </ul>
        </div>
    
  )


}



export default BlogPost
