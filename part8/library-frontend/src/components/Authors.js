import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}`

const EDIT_YEAR = gql`
mutation editAuthor($name: String!, $born: Int!){
editAuthor(name: $name, setBornTo: $born) {
  name
  born
 }
}
`



const Authors = (props) => {
  
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  
  if (!props.show || authors.loading) {
    return null
  }
  

  const setBirthYear = (e) => {
    const name= e.target.name.value
    const born = Number(e.target.born.value)
    e.preventDefault()
    editAuthor({ variables : {name, born}})
    e.target.reset()

  }

  return (
    
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
          <h2>Set birthyear</h2>
          <form onSubmit={setBirthYear}>
            <div><select id="name">
              {authors.data.allAuthors.map(a => 
              <option value={a.name} key={a.name}>{a.name}</option>
              )}
              </select></div>
            <div>born <input id= "born" /></div>
            <button type="subit">update author</button>
          </form>
          </div>
    </div>
  )
   
}

export default Authors