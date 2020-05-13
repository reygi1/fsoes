
import blogService from '../services/blogs'
const commentReducer = (state = '', action) => {
  
  switch(action.type) {
      case 'INIT_COMM':
          return action.data

      case 'ADDCOMM':
          return [...state, action.data]
    
    default:
      return state

  }

}


export const initializeComments = () => {
  return async dispatch => {
    const comments = await blogService.getComm()
    dispatch({
      type: 'INIT_COMM',
      data: comments
    })
    
  }
}


export const createComment = (id, content) => {

  return async dispatch => {
    const newcomm = await blogService.addComm(id, content)
    dispatch({
      type: 'ADDCOMM',
      data: newcomm
    })
  }
} 

export default commentReducer