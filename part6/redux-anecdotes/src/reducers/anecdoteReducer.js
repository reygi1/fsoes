
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_DB':
      return action.data
    case 'VOTE':
      return state.map(a => a.id === action.data.id ? action.data : a)
    case 'CREATE':
      return [...state, action.data]
    default:
      return state

  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_DB',
      data: anecdotes
    })
    
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
    
  }
} 


export const voteAnecdote = (id, object) => {
  return async dispatch => {
    const newObject = {...object, votes: object.votes + 1}   
    const newAnecdote= await anecdoteService.vote(id, newObject)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
    
  }
} 




export default anecdoteReducer