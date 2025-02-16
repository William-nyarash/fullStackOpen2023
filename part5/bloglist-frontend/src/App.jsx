import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import blogs from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        const updatedBlogs = blogs.map(blog => ({
          ...blog,
          likes: blog.likes || 0, 
        }));
        setBlogs(updatedBlogs);
      });
    }
  }, [user]);
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
      setUsername('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid username or password');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const Logout = async () => {
    try {
      window.localStorage.clear();
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

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, url, author, likes : 0 });
      setBlogs(blogs.concat(newBlog));
      setAuthor('');
      setTitle('');
      setUrl('');
      setSuccessMessage(`a new ${newBlog.title} by ${newBlog.author} added`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLike = async (blog) => {
    try {
      // Increment locally first
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
  
      console.log("Locally updated blog:", updatedBlog);
  
      const updatedBlogFromServer = await blogService.update(blog.id, updatedBlog);
      console.log("Server updated blog:", updatedBlogFromServer);
  
      setBlogs(blogs.map(b => (b.id === updatedBlogFromServer.id ? updatedBlogFromServer : b)));
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <div>
      <h2>Blogs</h2>

      {errorMessage && <p style={{ color: 'red', border: '2px solid red', padding: '12px' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', border: '4px solid green', padding: '12px' }}>{successMessage}</p>}

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
          <h2>{user.name} logged in<button type="button" onClick={Logout}>Logout</button></h2>
          <Togglable buttonLabel="new blog">
            <CreateBlog
              author={author}
              url={url}
              title={title}
              handleAuthorChange={(event) => setAuthor(event.target.value)}
              handleBlogCreation={handleBlogCreation}
              handleTitleChange={(event) => setTitle(event.target.value)}
              handleUrlChange={(event) => setUrl(event.target.value)}
            />
          </Togglable>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
