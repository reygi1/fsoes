import React, { useState } from 'react'
import { addedBlog } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setVis } from '../reducers/blogVis'






const BlogForm = () => {
  const dispatch = useDispatch()

  const formVis = useSelector(state => state.visib)
 

  const hideWhenVisible = { display: formVis ? 'none' : '' }
  const showWhenVisible = { display: formVis ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = { title:event.target.title.value, 
      author: event.target.author.value,
      url: event.target.url.value }

        dispatch(createBlog(blogObject))
        dispatch(addedBlog(blogObject.title,blogObject.author))
        event.target.reset()
        
      }

  

  

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="create" onClick={() =>  dispatch(setVis())}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>title:<input id="title" name="title"  /> </div>
          <div>author:<input  id='author' name="author" /> </div>
          <div>url:<input id="url" name="url" /> </div>
          <button type="submit" id="submitB" onClick={() =>  dispatch(setVis())} >create</button>
        </form>
        <button onClick={() =>  dispatch(setVis())}>cancel</button>
      </div>
    </div>)

}


export default BlogForm
