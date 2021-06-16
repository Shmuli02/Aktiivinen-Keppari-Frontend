import React from 'react'
import { Table } from 'react-bootstrap'
import noteService from '../services/notes'

const handleNewNote = async (event) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  const logUser = await JSON.parse(loggedUserJSON)
  console.log(event)
  console.log(logUser.username)
  noteService.setToken(logUser.token)
  const note = await noteService.create({
    task: event.target.value,
    user: logUser.username
  })
}

const handleNoteDelete = async (event) => {
  console.log(event)
}

const Tasks = ({tasks,notes,user}) => {
  const notesId = notes.map(note => note.task)

  return (
  <div>
    <h2>Tehtävät</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          {user ? <th>Suoritukset</th> : '' }
          <th>Tehtävä</th>
          <th>Haastavuus</th>
        </tr>
      </thead>
      <tbody>
        
        {tasks.map(task =>
          <tr key={task._id}>
            {user ? <div>
            <td>
              {notesId.includes(task._id) 
              ? <div><span class="badge badge-pill badge-success">Suoritettu</span> 
              <button value={task._id} onClick={handleNoteDelete} class="badge badge-danger">poista suoritus</button></div>
              : <div><span class="badge badge-pill badge-secondary">Ei suoritettu</span>
              <button value={task._id} onClick={handleNewNote} class="badge badge-primary">Merkitse suoritus</button></div>}
            </td>
            </div> : ''}
            <td>
              {task.title}
            </td>
            <td>
              {task.difficulty}
            </td>
            
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  )
}

export default Tasks