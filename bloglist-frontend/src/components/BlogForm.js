import React, { useState } from 'react'
import blogService from '../services/blogs'




const BlogForm = ({ setMessage, setBlogs, blogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [formVis, setFormVis] = useState(false)

  const hideWhenVisible = { display: formVis ? 'none' : '' }
  const showWhenVisible = { display: formVis ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = { title, author,url }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })

  }


  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="create" onClick={() => setFormVis(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>title:<input id="title" name="title" value={title} onChange={({ target }) => setTitle(target.value)} /> </div>
          <div>author:<input  id='author' name="author" value={author} onChange={({ target }) => setAuthor(target.value)}/> </div>
          <div>url:<input id="url" name="url" value={url} onChange={({ target }) => setUrl(target.value)} /> </div>
          <button id="submitB" onClick={() => setFormVis(false)} type="submit">create</button>
        </form>
        <button onClick={() => setFormVis(false)}>cancel</button>
      </div>
    </div>)

}


export default BlogForm
