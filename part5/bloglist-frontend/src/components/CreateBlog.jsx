import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, url, author })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor='title'>Title</label>
        <input   data-testid='title' id='title' type="text" value={title} onChange={handleChange(setTitle)} />
        <label htmlFor='author'>Author</label>
        <input data-testid='author' id='author' type="text" value={author} onChange={handleChange(setAuthor)} />
        <label htmlFor='url'>Url</label>
        <input data-testid='url' id='url' type="text" value={url} onChange={handleChange(setUrl)} />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog
