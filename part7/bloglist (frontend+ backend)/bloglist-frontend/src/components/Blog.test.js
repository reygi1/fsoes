import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog={
    user: {
      username: 'mario'
    },
    likes: 4,
    author: 'author1',
    title: 'title1',
    url: 'url1'
  }

  const user= {
    username: 'mario'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'title1 author1' )

  const url = component.container.querySelector('.url')
  expect(url).not.toBeVisible()

  const likes = component.container.querySelector('.likes')
  expect(likes).not.toBeVisible()

})

test('shows url and likes when button show pressed ', async () => {
  const blog={
    user: { username: 'mario' },
    likes: 4,
    author: 'author1',
    title: 'title1',
    url: 'url1'
  }
  const user= { username: 'mario' }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const url = component.container.querySelector('.url')
  expect(url).toHaveTextContent('url1' )

  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent('4' )

})


test('like pressed 2 times, function is called 2 times',  () => {
  const blog={
    user: { username: 'mario' },
    likes: 4,
    author: 'author1',
    title: 'title1',
    url: 'url1'
  }
  const user= { username: 'mario' }


  const likeBlog = jest.fn()

  const component = render(<Blog blog={blog} user={user} likeBlog={likeBlog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const button2 = component.getByText('like')

  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(likeBlog.mock.calls).toHaveLength(2)
})


