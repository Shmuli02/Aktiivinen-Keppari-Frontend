import React, {useState, useEffect} from 'react'

const handleRegister = (event) => {
  
}

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  return (
    <div>
      <form className="px-4 py-3" onSubmit={handleRegister}>
        <div className="form-group">
          <label>Käyttäjänimi</label>
          <input type="text" className="form-control" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Käyttäjänimi" />
        </div>
        <div className="form-group">
          <label>Sähköposti</label>
          <input type="email" className="form-control" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Sähköposti" />
        </div>
        <div className="form-group">
          <label>Salasana</label>
          <input type="password" className="form-control" value={password1} onChange={({ target }) => setPassword1(target.value)} placeholder="Salasana" />
        </div>
        <div className='form-group'>
          <label>Vahvista Salasana</label>
          <input type="password" className="form-control" value={password2} onChange={({ target }) => setPassword2(target.value)} placeholder="Vahvista salasana" />
        </div>
        <button type="submit" className="btn btn-primary">Rekisteröidy</button>
      </form>
    </div>
  )
}

export default Register