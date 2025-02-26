import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from '../components/CreateBlog'
import { vi } from 'vitest'

test('create a blog post', async () => {
  const addBlog = vi.fn()


  render(<CreateBlog createBlog={addBlog} />)

  const user = userEvent.setup()


  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)


  await user.type(titleInput, 'new blog to be created')
  await user.type(authorInput, 'user create')
  await user.type(urlInput, 'http://example-blog.example')


  const createButton = screen.getByText('create')
  await user.click(createButton)


  expect(addBlog).toHaveBeenCalledTimes(1)
  expect(addBlog).toHaveBeenCalledWith({
    title: 'new blog to be created',
    author: 'user create',
    url: 'http://example-blog.example'
  })
})
