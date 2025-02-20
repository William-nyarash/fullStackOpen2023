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
        <div>
          title:
          <input type="text" value={title} onChange={handleChange(setTitle)} />
        </div>
        <div>
          author:
          <input type="text" value={author} onChange={handleChange(setAuthor)} />
        </div>
        <div>
          url:
          <input type="text" value={url} onChange={handleChange(setUrl)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog
