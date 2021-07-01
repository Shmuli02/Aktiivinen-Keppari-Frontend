import React, {useState, useEffect} from 'react'
import userService from '../services/user'
import Notification from '../components/Notification'
import { Redirect } from 'react-router'
import {
  useHistory
} from "react-router-dom"


const Register = (props) => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleRegister = async (event) => {
    event.preventDefault()
   

    if (password1 === password2) {
      try {
      const user = await userService.register({
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password1
      })
      history.push('/login')
      } catch (exception) {
        event.preventDefault()
        setErrorMessage('Ongelma')
        
      }
    } else {
      setErrorMessage('Salasanat eivät täsmää')
      event.preventDefault()
  } 
}

  return (
    <div>
      <Notification message={errorMessage} />
      <form className="px-4 py-3" onSubmit={handleRegister}>
        <div className="form-group">
          <label>Käyttäjänimi</label>
          <input type="text" className="form-control" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Käyttäjänimi" />
        </div>
        <div className="form-group">
          <label>Etunimi</label>
          <input type="text" className="form-control" value={firstname} onChange={({ target }) => setFirstName(target.value)} placeholder="Etunimi" />
          <label>Sukunimi</label>
          <input type="text" className="form-control" value={lastname} onChange={({ target }) => setLastName(target.value)} placeholder="Sukunimi" />
        </div>
        <div className="form-group">
          <label>Sähköposti</label>
          <input type="email" className="form-control" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Sähköposti" />
        </div>
        <div className="form-group">
          <label>Salasana</label>
          <input type="password" autoComplete="new-password" className="form-control" value={password1} onChange={({ target }) => setPassword1(target.value)} placeholder="Salasana" />
        </div>
        <div className='form-group'>
          <label>Vahvista Salasana</label>
          <input type="password" autoComplete="new-password" className="form-control" value={password2} onChange={({ target }) => setPassword2(target.value)} placeholder="Vahvista salasana" />
        </div>
        <button type="submit" className="btn btn-primary">Rekisteröidy</button>
      </form>
    </div>
  )
}

export default Register