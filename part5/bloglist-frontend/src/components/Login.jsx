import { useState } from 'react'

const Login =({ submitLoginForm }) => {
  const[username, setUsername] =useState(' ')
  const[password,setPassword] = useState('')

  const handleLogin =async (event) => {
    event.preventDefault(event)
    try{
      await submitLoginForm({ username, password })
      setPassword('')
      setUsername('')
    }catch(error){
      console.error(error.message)
    }
  }
  return(
    <div>
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
            Username
          <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
            Password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login