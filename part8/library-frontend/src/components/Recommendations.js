import React, {useState, useEffect} from 'react'
import { gql,  useQuery } from '@apollo/client'
import {ALL_BOOKS} from './Books'


const Recommendations =  (props) => {

    const genre1 =  useQuery(gql`query{me{favoriteGenre}}`)

    const [genre, setGenre] = useState(null)
   
    const books = useQuery(ALL_BOOKS, {
        variables: {genre: genre}
      })
  
    useEffect(() => {
        if(genre1.data )
        {
          setGenre(genre1.data.me.favoriteGenre)    }      
        
      }, [genre1]) 
    
      
  if (!props.show ||genre1.loading || books.loading) {
    return null
  }
 
  
  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <b>{genre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations