
const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGED':
            return action.data
      default:
        return state
  
    }
  
  }

export const filterValue = (input) => {
    return ({
        type: 'CHANGED',
        data: input
    })
} 

export default filterReducer