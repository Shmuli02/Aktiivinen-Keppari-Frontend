import React from 'react'
import { ProgressBar, Table, Badge, Button } from 'react-bootstrap'
import {EditNoteForm, NewNoteForm} from '../components/Note'

const User = ({tasks,user,notes}) => {
  const notesId = notes.map(note => note.task)
  const userTasks = tasks.filter(task => notesId.includes(task.id))
  const taskLenght = tasks.length
  const userTasksLenght = userTasks.length

  return (
  <div className="UserPage">
    <h1>Omat sivut</h1>
    <ProgressBar now={userTasksLenght/taskLenght*100} />
    <p>suoritettu {userTasksLenght}/{taskLenght} tehtävää</p>
    {taskLenght == userTasksLenght ? 
    <div>
      <p>Olet suorittanut kaikki tehtävät <Badge variant="info">Tarkistuksessa</Badge></p>
      {/* <b>Tilanne: </b><Badge variant="info">Tarkistus</Badge> */}
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
          <tr key={task.id}>
            <td>
              {task.title}
            </td>
            <td>
              {notesId.includes(task.id) 
              ? <EditNoteForm taskId={task.id} note={notes.filter(function(note) {
                return note.task == task.id
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