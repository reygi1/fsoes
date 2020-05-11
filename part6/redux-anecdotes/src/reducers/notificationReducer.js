
const notificationReducer = (state = '', action) => {
  
    switch(action.type) {
        case 'VOTED':
            return action.data

        case 'ADDED':
            return action.data
      
        case 'RESET':
            return ''

      default:
        return state
  
    }
  
  }

  var timeoutID

export const votedAnecdote = (content, n) => {
    return async dispatch => {       
  clearTimeout(timeoutID)
  dispatch({
        type:'VOTED',
        data: `you voted '${content}'`
      })
    timeoutID = setTimeout(() => {
    dispatch({type: 'RESET'})      
    }, n * 1000)   
}
}

export const addedAnecdote = (content, n) => {
    return async dispatch => {       
    
      clearTimeout(timeoutID)

         await dispatch({
            type:'ADDED',
            data: `you added '${content}'`
          }     )
          
        
      timeoutID = await setTimeout(() => {
        dispatch({type: 'RESET'})

       
    }, n * 1000)

  
        
    
}

}

export default notificationReducer