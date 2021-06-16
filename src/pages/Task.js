import React from 'react'
import { Table } from 'react-bootstrap'

const Tasks = ({tasks,notes}) => {
  const notesId = notes.map(note => note.task)
  return (
  <div>
    <h2>Tehtävät</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Suoritukset</th>
          <th>Tehtävä</th>
          <th>Haastavuus</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task =>
          <tr key={task.id}>
            <td>
              {notesId.includes(task._id) 
              ? <div><span class="badge badge-pill badge-success">Suoritettu</span> 
              <a href="#" class="badge badge-danger">poista suoritus</a></div>
              : <div><span class="badge badge-pill badge-secondary">Ei suoritettu</span>
              <a href="#" class="badge badge-primary">Merkitse suoritus</a></div>}
            </td>
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