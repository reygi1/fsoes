import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addedAnecdote } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnec.value
        event.target.newAnec.value= ''
        props.createAnecdote(content)
        props.addedAnecdote((content),5)  
        
      }

  return (
    <div>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="newAnec"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


const mapDispatchToProps = {
  createAnecdote,
  addedAnecdote
  }
  
  const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes
    }
  }
  
  const conAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
  
  
  export default conAnecdoteForm