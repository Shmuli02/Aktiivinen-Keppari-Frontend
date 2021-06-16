import React, { useState, useEffect } from 'react'

import Task from './pages/Task'
import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'


import taskService from './services/tasks'
import noteService from './services/notes'

import ReactDOM from 'react-dom'
import {Navbar, Nav} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
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

const App = () => {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  
  useEffect( () => {
    async function getFunction() {
      const tasks = await taskService.getAll()
      setTasks( tasks )
    }
    getFunction()
  }, [])


  useEffect(() => {
    async function getData() {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const logUser = await JSON.parse(loggedUserJSON)
        setUser(logUser.username)
        const notes = await noteService.getAll()
        const note2 = await notes.filter(note => note.user.username === logUser.username)
        setNotes(note2)
      }
    }
    getData()
  }, [])

  console.log(user,tasks,notes)
  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  const handleLogout = (enevt) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotes([])
  }
  
  const logout = () => (
    <button onClick={handleLogout}>Logout</button>
  )

  return (
    <div>
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/task">Tehtävät</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/user">Oma sivu</Link>
            </Nav.Link>
            <Nav.Link href="/user" as="span">
              {user
                ? <em>{user} logged in {logout()}</em>
                : <Link to="/login">Login</Link>
              }
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/tasks/:id">
          <Note tasks={tasks} />
        </Route>
        <Route path="/task">
          <Task tasks={tasks} notes={notes} />
        </Route>
        <Route path="/user">
          {user ? <User notes={notes} /> : <Redirect to="/login" />}
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