import { useState } from 'react'

const Blog = ({ blog, updateLikes,deleteBlog }) => {
  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
  }
  const handleDelete =async() =>  {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await deleteBlog(blog.id)
      } catch (error) {
        console.error('Failed to delete blog:', error.message)
      }
    }
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await updateLikes(blog.id, updatedBlog)
  }
  return (
    <div  className='blog' style={{ padding: '10px', border: '1px solid black', marginBottom: '5px' }}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleDetails}> {details ? 'Hide' : 'View' }</button>
      </div>
      {details && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog
