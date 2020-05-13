import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import {  setUser, logOut } from './reducers/loginReducer'
import { wrongCred } from './reducers/notificationReducer'
import { Table,  Button, Navbar, Nav  } from 'react-bootstrap'
import {
  BrowserRouter as Router, Switch, Route, Link, useParams, useHistory} 
  from "react-router-dom"
import BlogPost from './components/BlogPost'

const App = () => {
  const dispatch = useDispatch()
  
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)



  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    // eslint-disable-next-line
  }, [])

  
  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])



  
const handleLogin = async (event) => {  
  
    event.preventDefault()
    try {
      const user = await loginService.login({ 
        username: event.target.username.value, 
        password: event.target.password.value})

  
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      
      
    } catch (exception) {
     dispatch(wrongCred())
    }
  }
  
const handleLogout =  () => {
  dispatch(logOut())
}





  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification  />
        <form onSubmit={handleLogin}>
          <div>
              username
            <input id="username"
              type="text"
              name="username"
            />
          </div>
          <div>
              password
            <input id="password"
              type="password"
              name="password"
            />
          </div>
          <Button id="login-button" type="submit">login</Button>
        </form>
      </div>
    )
  }
  
  
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="light" >
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <div  >
       <Link to="/" style={{paddingRight: 5}}>blogs</Link>
       <Link to="/users" style={{paddingRight: 5}}>users
        </Link>
      
      {user.name} logged in {}
        <Button onClick={handleLogout}> logout</Button>   
        </div>
    </Nav>
  </Navbar.Collapse>
      </Navbar>
      <Notification  />
      <h2>blog app</h2>

      <Switch>
      <Route path="/blogs/:id">
         <BlogPost blogs={blogs}/>
        </Route>
      <Route path="/users/:id">
         <User users={users}/>
        </Route>
        <Route path="/users">
         <h2>Users</h2>
         <Table striped>
           <tbody>            
              <tr><td></td><td><b>blogs created</b></td></tr>
           {users.map(user => 
             <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
           )}
           </tbody>
         </Table>
        </Route>
        <Route path="/">      
      <BlogForm  blogs={blogs} />

      <div className="blogs">{blogs.sort((a,b) => a.likes - b.likes).map(blog =>

<Link to={`/blogs/${blog.id}`}> <Blog  user = {user}  blogs={blogs} key={blog.id} blog={blog}  /> </Link>  
      )}
      
    </div>
    </Route>
    </Switch>
    </Router>
  )

}

export default App