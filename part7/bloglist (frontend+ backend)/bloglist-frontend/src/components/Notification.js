import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    
  const message = useSelector(state => state.notification)

  const added = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  console.log(message)

  if (message === '' || message === undefined) {
    return null
  }  else if(message.includes('a new')){
    return (
      
      <div className="added" style={added}>
        {message}
      </div>
    )    } else if(message.includes('wrong')){
    return (
      <div className="error" style={error}>
        {message}
      </div>
    )
  }
  else {
    return null
  }
}

export default Notification