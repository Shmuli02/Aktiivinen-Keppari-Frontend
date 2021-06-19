import React from 'react'
import { Table } from 'react-bootstrap'
import noteService from '../services/notes'
import {EditNoteForm, NewNoteForm} from '../components/Note'
import Badge from 'react-bootstrap/Badge'



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