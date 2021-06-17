import React, {useState, useEffect} from 'react'
import {
  useHistory
} from "react-router-dom"
import loginService from '../services/login'



const Login = (props) => {
  const history = useHistory()

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  

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
      props.onLogin(username)
      history.push('/')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  return (
    <div>
      <form className="px-4 py-3" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username"/>
        </div>
        <div className="form-group">
          <label >Password</label>
          <input type="password" className="form-control" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password"/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
          <label className="form-check-label">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="/register">New around here? Sign up</a>
      <a className="dropdown-item" href="#">Forgot password?</a>
  </div>
  )
}

export default Login