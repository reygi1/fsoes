
const notificationReducer = (state = '', action) => {
  
  switch(action.type) {
      case 'WRONG':
          return action.data

      case 'ADDEDB':
          return action.data
    
      case 'RESET':
          return ''

    default:
      return state

  }

}


export const wrongCred = () => {
  return async dispatch => {     
dispatch({
      type:'WRONG',
      data: 'wrong username or password'
    })
  setTimeout(() => {
  dispatch({type: 'RESET'})      
  }, 5000)   
}
}

export const addedBlog = (title,author) => {
  return async dispatch => {       
  
  dispatch({
          type:'ADDEDB',
          data: `a new blog ${title} by ${author} added`
        }     )
        
 setTimeout(() => {
      dispatch({type: 'RESET'})

     
  }, 5000)


      
  
}

}

export default notificationReducer