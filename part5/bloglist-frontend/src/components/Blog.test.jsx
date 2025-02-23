import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect, test,vi } from 'vitest'

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