import React, { useState, useEffect } from 'react'

import Task from './pages/Task'
import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'
import Register from './pages/Register'
import ImageGallery from './pages/Gallery'


import taskService from './services/tasks'
import noteService from './services/notes'
import imageService from './services/images'

import { getNotes } from './components/Note'

import ReactDOM from 'react-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom"
import ReactGA from 'react-ga';



const App = () => {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [images, setImages] = useState([])
  
  async function getImages() {
    const images = await imageService.getAll()
    setImages(images)
  }

  async function getFunction() {
    const tasks = await taskService.getAll()
    setTasks( tasks )
  }
  async function getData() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const logUser = await JSON.parse(loggedUserJSON)
      setUser(logUser.username)
    const notes = await getNotes()
    setNotes(notes)
    }
  }
  useEffect( () => {
    getImages()
  },[])

  useEffect( () => {
    getFunction()
  }, [])

  useEffect(() => {
    getData()
  }, [])

  const login = (user) => {
    getData()
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

  const handleNotesChange = async (event) => {
    getData()
  }
  
  const logout = () => (
    <button onClick={handleLogout}>Kirjaudu ulos</button>
  )

  ReactGA.initialize('UA-200757435-1');
  ReactGA.pageview(window.location.pathname + window.location.search);


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/" className="link">Etusivu</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/tasks" className="link">Tehtävät</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/user" className="link">Oma sivu</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/gallery" className="link">Galleria</Link>
            </Nav.Link>
            <Nav.Link href="/user" as="span">
              {user
                ? <em>{user} kirjautunut {logout()}</em>
                : <Link to="/login" className="link" >Kirjaudu</Link>
              }
          </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        
        <Route path="/tasks">
          <Task tasks={tasks} user={user} notes={notes} handleNoteChange={handleNotesChange}/>
        </Route>
        <Route path="/user">
          {user ? <User notes={notes} handleNoteChange={handleNotesChange} user={user} tasks={tasks}/> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/gallery">
          <ImageGallery images={images}/>
        </Route>
        <Route path="/">
          <Home />

        </Route>
      </Switch>    
      <div>
        <br />
        {/* <em>Sivujen toteutus: Mitavain</em> */}
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