import React from 'react'
import { connect } from 'react-redux'
import { votedAnecdote } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {

    const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote.id, anecdote)
    props.votedAnecdote(anecdote.content,5)    
    }
        

  return (
    <div>
       {props.anecdotes.sort((a,b)=> b.votes - a.votes).filter(a=> a.content.toLowerCase().includes(props.filter.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
voteAnecdote,
votedAnecdote
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const conAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)


export default conAnecdoteList