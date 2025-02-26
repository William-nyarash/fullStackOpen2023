import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { expect, test,vi } from 'vitest'
import { use } from 'react'

test('renders blog and author', () => {
  const blog = {
    title:'title to be render',
    author:'waren is rendered',
    url:'http://example-test',
    likes:10,
  }

  const updateLikes = vi.fn()
  const deleteBlog = vi.fn()
  render(<Blog blog={blog} updateLikes={updateLikes} />)

  expect(screen.getByText((content) => content.includes('title to be render'))).toBeDefined()
  expect(screen.getByText((content) => content.includes('waren is rendered'))).toBeDefined()


  const urlElement  = screen.queryByText('http://example-test')
  const likesElement = screen.queryByText('Likes: 10')
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('toggle the blog', async () => {
  const blogObject = {
    title:'title to be render',
    author:'waren is rendered',
    url:'http://example-test',
    likes:1,
  }

  const eventHandler = vi.fn()

  render(<Blog blog={blogObject} handLike={eventHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(screen.getByText('http://example-test')).toBeInTheDocument()
})


test('like button is cliked', async () => {
  const blogObject = {
    id: 1,
    title: 'blog that is liked',
    author: 'liked by me',
    url: 'http://likeblog.example.com',
    likes: 1,
  }
  const updateLikes = vi.fn()
  const handleToggle = vi.fn()
  render(<Blog blog={blogObject} handleToggle={handleToggle} updateLikes={updateLikes} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)
  const likeButton  = screen.getByText('Like')
  await user.click(likeButton)
  expect(screen.getByText('Likes: 1')).toBeInTheDocument()
})