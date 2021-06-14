import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Notes from './pages/Notes'
// import Login from './pages/Login'
import taskService from './services/tasks'
import Home from './pages/Home'
import {Navbar, Nav} from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"



const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'tärkeä' : ''}</strong></div>
    </div>
  )
}


const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    taskService.getAll().then(tasks => 
      setNotes( tasks )
      )
  }, [])

  const [user, setUser] = useState(null) 

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">Tehtävät</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em>{user} logged in</em>
                : <Link to="/login">login</Link>
              }
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/notes/:id">
          <Note notes={notes} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>      
      <div>
        <br />
        <em>Sivujen toteutus: Mitavain</em>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root')
)