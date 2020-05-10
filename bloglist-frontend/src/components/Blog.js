import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, user }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: expanded ? 'none' : '' }
  const showWhenVisible = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const likeBlog = async (bloga) => {
    const addedBlog={
      user: bloga.user,
      likes: bloga.likes + 1,
      author: bloga.author,
      title: bloga.title,
      url: bloga.url
    }
    await blogService.update(bloga.id, addedBlog)
    const resp = await blogService.getAll()
    setBlogs(resp)

  }

  const removeBlog = async (bloga) => {
    if (window.confirm(`Remove blog ${bloga.title}`)) {
      await blogService.del(bloga.id)
      const resp = await blogService.getAll()
      setBlogs(resp)
    } }

  const userPost = (bloga) => {
    if(bloga.user.username === user.username)
      return { display : '' }
    else
      return { display : 'none' }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button id={blog.title} onClick={toggleExpanded}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleExpanded}>hide</button>
        <div className='url'>{blog.url}</div>
        <div className='likes'>likes {blog.likes}</div> <button  id="likeb" onClick={() => likeBlog(blog)}>like</button>
        <div>{blog.author}</div>
        <button  id="delete"  onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
