
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_DB':
      return action.data
    case 'UPDATE':
      return state.map(a => a.id === action.data.id ? action.data : a)
    case 'CREATE':
      return [...state, action.data]
    case 'DELETE':
        return state.map(a => a.id === action.data.id ? action.data : a)
    default:
      return state

  }

}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_DB',
      data: blogs
    })
    
  }
}

export const createBlog = (content) => {

  return async dispatch => {
    const newblog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newblog
    })
  }
} 


export const likeBlog = (id, object) => {
  return async dispatch => {   
    const likedBlog = {...object, likes: object.likes+1}
    const newblog= await blogService.update(id, likedBlog)
    dispatch({
      type: 'UPDATE',
      data: newblog
    })
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_DB',
      data: blogs
    })
    
  }
} 


export const removeBlog = (id) => {
  return async dispatch => {   
    await blogService.del(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_DB',
      data: blogs
    })
    
    
  }
} 



export default blogReducer