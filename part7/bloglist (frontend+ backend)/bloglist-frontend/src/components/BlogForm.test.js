import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('blogform has author', () => {
  const blogs={
    user: {
      username: 'mario'
    },
    likes: 4,
    author: 'author',
    title: 'title1',
    url: 'url1'
  }

  const mock = jest.fn()

  const component = render(
    <BlogForm blogs={blogs} author='auadthor' setAuthor={mock} />
  )

  const author = component.container.querySelector('#author')

  fireEvent.change(author, { target: { value: 'author1' } })

  expect(author).toHaveValue('author1' )

})
