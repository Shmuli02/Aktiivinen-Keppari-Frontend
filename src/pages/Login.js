import React, {useState, useEffect} from 'react'
import {
  useHistory
} from "react-router-dom"
import loginService from '../services/login'
import Notification from '../components/Notification'



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
      setErrorMessage('Väärä käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  return (
    <div>
      <Notification message={errorMessage} />
      <form className="px-4 py-3" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Käyttäjänimi</label>
          <input type="text" autoComplete="username" className="form-control" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Käyttäjänimi"/>
        </div>
        <div className="form-group">
          <label >Salasana</label>
          <input type="password" autoComplete="current-password" className="form-control" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Salasana"/>
        </div>
        <button type="submit" className="btn btn-primary">Kirjaudu</button>
      </form>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="/register"><b>Uusi käyttäjä? Rekisteröidy</b></a>
  </div>
  )
}

export default Login