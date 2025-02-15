import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import { use } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      setErrorMessage('') 
    } catch (error) {
      setErrorMessage('Invalid username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Logout = async () => {
    try {
      window.localStorage.clear( );
      
      setUser(null);
      
      console.log("Logged out successfully");
    } catch (err) {
      console.log({ message: "Unable to clear record", error: err });
    }
  };
  

  return (
    <div>
      <h2>Blogs</h2>

      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

      {!user ? (
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input 
              type="text" 
              name="Username" 
              value={username} 
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input 
              type="password"
              value={password}
              name="Password" 
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {user.username} <button type="button" onClick={Logout}>Logout</button>
          </h2>
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
