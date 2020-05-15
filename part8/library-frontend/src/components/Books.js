import React, {useState} from 'react'
import { gql, useQuery } from '@apollo/client';

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author {name}
    published
    genres
  }
}`


const Books = (props) => {

  const [genre, setGenre] = useState(null)

const handleGenre = (e) => {
  setGenre(e.target.value)
}

    const books = useQuery(ALL_BOOKS, {
      variables: {genre: genre}
    })



  if (!props.show || books.loading) {
    return null
  }

  const genres = books.data.allBooks
                .map(a => a.genres)
                  .flat(1)
                    .filter((v, i, a) => a.indexOf(v) === i)

  return (
    <div>
      <h2>books</h2>

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
      {genres.map((g, i) => 
        <button id="genre" value={g} onClick={handleGenre} key={i} >{g}</button>
        )}<button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books