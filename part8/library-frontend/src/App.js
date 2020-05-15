
import React, { useState } from 'react'
import { useApolloClient} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'


const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [page, setPage] = useState('authors')

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

 
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={{display: token ? '' : 'none' }} onClick={() => setPage('add')}>add book</button>
        <button style={{display: token ? 'none' : '' }} onClick={() => setPage('login')}>login</button>
        <button style={{display: token ? '' : 'none' }} onClick={() => setPage('recommend')}>recommend</button>
        <button style={{display: token ? '' : 'none' }} onClick={() => logout()}>logout</button>
      </div>

      <Authors 
        show={page === 'authors'}
      />

      <Books 
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login setToken={setToken} token={token}
        show={page === 'login'}
      />

      <Recommendations 
        show={page === 'recommend'}
      />


    </div>
  )
}

export default App