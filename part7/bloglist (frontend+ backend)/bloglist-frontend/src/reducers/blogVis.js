
import loginService from '../services/login'




const blogVis = (state = false, action) => {
  switch(action.type) {
    case 'VIS':
      return !state
    default:
      return state

  }

}

export const setVis = () => {
  return async dispatch => {
    dispatch({
      type: 'VIS'
    })
    
  }
}







export default blogVis