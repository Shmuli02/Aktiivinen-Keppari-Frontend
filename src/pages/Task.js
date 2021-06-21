import React, {useState} from 'react'
import { Table } from 'react-bootstrap'
import noteService from '../services/notes'
import {EditNoteForm, NewNoteForm} from '../components/Note'
import Badge from 'react-bootstrap/Badge'
import Timer from '../components/Timer'
import Notification from '../components/Notification'



const Tasks = ({tasks,notes,user}) => {
  const notesId = notes.map(note => note.task)
  const [errorMessage, setErrorMessage] = useState(null)

  return (
  <div>
    <h1>Tehtävät</h1>
    <Notification message={errorMessage} />
    <br></br>
    <h2>Aikaa jäljellä</h2>
    <Timer />
    <br></br>
    <Table striped bordered hover>
      <thead>
        <tr>
          {user ? <th>Suoritukset</th> : '' }
          <th>Tehtävä</th>
          <th>Haastavuus</th>
          {user ? <th>Muokkaus</th> : '' }
        </tr>
      </thead>
      <tbody>
        
        {tasks.map(task =>
          <tr key={task._id}>
            {user ?
            <td>
              {notesId.includes(task._id) 
              ? <Badge pill variant="success">Suoritettu</Badge>
              : <Badge pill variant="light">Ei suoritettu</Badge>
              }
            </td> : '' }
            
            <td>
              {task.title}
            </td>
            <td>
              {task.difficulty}
            </td>
            {user ?
            <td>
              {notesId.includes(task._id) 
              ? <EditNoteForm taskId={task._id} note={notes.filter(function(note) {
                return note.task == task._id
              })}/>
              : <NewNoteForm taskId={task._id} user={user}/> 
              }
            </td> : ''}
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  )
}

export default Tasks