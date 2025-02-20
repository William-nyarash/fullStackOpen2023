import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
      } catch (error) {
        setErrorMessage('Failed to fetch blogs');
      }
    };
  
    if (user) {
      fetchBlogs();
    }
  }, [user]);
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`A new blog "${newBlog.title}" by ${newBlog.author} added`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      setSuccessMessage('Blog deleted successfully');
    } catch (error) {
      setErrorMessage('Failed to delete blog');
    }
  };
  
  const updateLikes = async(id, updatedBlog)=>{
    try{
      const newBlog = await blogService.update(id,updatedBlog)
      setBlogs(blogs.map((blog)=> blog.id === id ? newBlog :blog))
    }catch(error){
      setErrorMessage(` Failed to update likes: ${error.message}`)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      {errorMessage && <p style={{ borderRadius: '12px', color: 'red', border: '2px solid red', padding: '12px' }}>{errorMessage}</p>}
      {successMessage && <p style={{ borderRadius: '12px', color: 'green', border: '4px solid green', padding: '12px' }}>{successMessage}</p>}

      {!user ? (
        <form onSubmit={handleLogin}>
          <h2>log in to application</h2>
          <div>
            Username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>{user.name} logged in <button type="button" onClick={handleLogout}>Logout</button></h2>
          <Togglable buttonLabel="new blog">
            <CreateBlog createBlog={createBlog} />
          </Togglable>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}   updateLikes={updateLikes} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
