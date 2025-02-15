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
  const [title,setTitle] =useState(' ')
  const[author, setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [successMessage,setSuccessMessage] = useState(null)


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
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [successMessage]);
  const handleUserCreation = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(newBlog)); 
      setTitle('');
      setAuthor('');
      setUrl('');
      setSuccessMessage(`a new ${newBlog.title} by ${newBlog.author} added`)

    } catch (error) {
      setErrorMessage('Error creating blog')
    }
  };

  return (
    <div>
      <h2>Blogs</h2>

      {errorMessage && <p style={{  borderRadius:'12px' ,  color:'red ', border: '2px solid red',padding:'12px'}}>{errorMessage}</p>}
      {successMessage && <p style={{ borderRadius:'12px' ,  color:'green ',border: '4px solid green',padding:'12px' }}>{successMessage}</p>}

      {!user ? (
        <form onSubmit={handleLogin}>
          <h2>log in to application</h2>
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
          <h2>{user.name}  logged in<button type="button" onClick={Logout}>Logout</button>
          </h2>
          <div>
            <h2>create new</h2>
            <form onSubmit={handleUserCreation}>
              <div>
                title :
                <input type="text" value={title} name='title'  onChange={({target})=>setTitle(target.value)}/>
              </div>
              <div>
                author :
                <input type="text" value={author} name='author' onChange={({target})=>setAuthor(target.value)} />
              </div>
              <div>
                url :
                <input type="text" value={url} name='url' onChange={({target})=>setUrl(target.value)} />
              </div>
              <button type="submit">create</button>
            </form>
          </div>
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
