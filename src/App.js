import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Task from './components/Task'
import blogService from './services/blogs'
import loginService from './services/login'
import taskService from './services/tasks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [tasks, setTasks] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    taskService.getAll().then(tasks => 
      setBlogs( tasks )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = () => {

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addBlog}>
    <input
      value={newBlog}
      onChange={({ target }) => setNewBlog(target.value)}
    />
    <button type="submit">save</button>
  </form>  
  )
const handleLogout = (enevt) => {
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const logout = () => (
  <button onClick={handleLogout}>Logout</button>
)


  return (
    <div>
      
      <h2>Login</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in {logout()}</p>
        {noteForm()}
      {tasks.map(task => 
        <Task key={task.id} task={task} />
        )}
    </div>
      
    }

      {user !== null}


      
    </div>
  )
}

export default App