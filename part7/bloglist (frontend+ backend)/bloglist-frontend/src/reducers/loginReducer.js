
import loginService from '../services/login'




const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'SETUSER':
      return action.data
    case 'LOGOUT':
      return action.data
    default:
      return state

  }

}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SETUSER',
      data: user
    })
    
  }
}



export const logOut = () => {
   window.localStorage.removeItem('loggedBlogappUser')
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
    
  } 
  
}




export default loginReducer