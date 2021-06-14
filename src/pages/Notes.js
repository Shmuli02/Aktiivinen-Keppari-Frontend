import React from 'react'
import {
  Link,
} from "react-router-dom"
import { Table } from 'react-bootstrap'

const Notes = ({notes}) => (
  <div>
    <h2>Tehtävät</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tehtävä</th>
          <th>Haastavuus</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note =>
          <tr key={note.id}>
            <td>
            <Link to={`/tasks/${note._id}`}>
              {note.title}
              </Link>
          </td>
          <td>
            {note.difficulty}

          </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

export default Notes