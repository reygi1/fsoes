
import userService from '../services/login'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_US':
      return action.data
    case 'VOTE':
      return state.map(a => a.id === action.data.id ? action.data : a)
    case 'CREATE':
      return [...state, action.data]
    default:
      return state

  }

}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_US',
      data: users
    })
    
  }
}



export default userReducer