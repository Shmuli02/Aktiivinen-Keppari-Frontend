import React from 'react'
import { ProgressBar, Table, Badge, Button } from 'react-bootstrap'
import {EditNoteForm, NewNoteForm} from '../components/Note'

const User = ({tasks,user,notes}) => {
  const notesId = notes.map(note => note.task)
  const userTasks = tasks.filter(task => notesId.includes(task._id))
  const taskLenght = tasks.length
  const userTasksLenght = userTasks.length

  return (
  <div className="UserPage">
    <h1>Omat sivut</h1>
    <ProgressBar now={userTasksLenght/taskLenght*100} />
    <p>suoritettu {userTasksLenght}/{taskLenght} tehtävää</p>
    {taskLenght == userTasksLenght ? 
    <div>
      <p>Olet suorittanut kaikki tehtävät</p>
      <b>Tilanne: </b><Badge variant="info">Tarkistus</Badge>
      <p>Voit ladata diplomin tämän linkin kautta 
      <Button variant="primary" size="sm">
      Lataa diplomi
    </Button>{' '}
    </p>
    </div>
    : ''}
    
    {userTasksLenght>=1 ? 
    <div>
      <h3>Suoritukset</h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tehtävä</th>
          <th>Muokkaus</th>
        </tr>
      </thead>
      <tbody>
        
        {userTasks.map(task =>
          <tr key={task._id}>
            <td>
              {task.title}
            </td>
            <td>
              {notesId.includes(task._id) 
              ? <EditNoteForm taskId={task._id} note={notes.filter(function(note) {
                return note.task == task._id
              })}/>
              : '' }
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    </div>
    : <p>ei suoritukisa</p>}
  </div>
  )
}

export default User