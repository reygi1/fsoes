import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const Login = ({show, token, setToken }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const [ login, result ] = useMutation(LOGIN, {
      onError: (error) => {
       console.log(error.graphQLErrors[0].message)
      }
    })
  
    useEffect(() => {
      if ( result.data ) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('user-token', token)
      }
    }, [result.data]) // eslint-disable-line
  
    const submit = async (event) => {
      event.preventDefault()
  
      login({ variables: { username, password }
      
      })

      setUsername('')
      setPassword('')
    }
  
    
  if (!show) {
    return null
  }

  if (token) {
    return <div>Logged in</div>
  }

    return (
      <div>
        <form onSubmit={submit}>
          <div>
            username <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  
  export default Login