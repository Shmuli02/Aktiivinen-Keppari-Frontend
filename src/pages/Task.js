import React, {useState} from 'react'
import { Table, Button, OverlayTrigger,Tooltip, Image, Popover } from 'react-bootstrap'
import noteService from '../services/notes'
import {EditNoteForm, NewNoteForm} from '../components/Note'
import Badge from 'react-bootstrap/Badge'
import Timer from '../components/Timer'
import Notification from '../components/Notification'
import {IconContext} from "react-icons"
import { BsFillQuestionCircleFill } from "react-icons/bs";


const Tasks = ({tasks,notes,user,handleNoteChange}) => {
  const notesId = notes.map(note => note.task)
  const [errorMessage, setErrorMessage] = useState(null)


  const Info = ({title, description}) => (
    <OverlayTrigger trigger="click" placement="right" overlay={
      <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>
      {description}
      </Popover.Content>
    </Popover>
    }>
      <Button variant="link">
      <IconContext.Provider  value={{ style: {fontSize: '20px', color: "rgb(0, 0, 0)"}}}>
        <BsFillQuestionCircleFill />
    </IconContext.Provider>
      </Button>
      
    </OverlayTrigger>
  );

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
          {/* <th>Haastavuus</th> */}
          {user ? <th>Muokkaus</th> : '' }
        </tr>
      </thead>
      <tbody>
        
        {tasks.map(task =>
          <tr key={task.id}>
            {user ?
            <td>
              
              {notesId.includes(task.id) 
              ? <Badge pill variant="success">Suoritettu</Badge>
              : <Badge pill variant="dark">Ei suoritettu</Badge>
              }
            </td> : '' }
            
            <td>
            <Info title={task.title} description={task.description}/> 
            {task.title}
            
            </td>
            {/* <td>
              {task.difficulty}
            </td> */}
            {user ?
            <td>
              {notesId.includes(task.id) 
              ? <EditNoteForm taskId={task.id} handleNoteChange={handleNoteChange}  note={notes.filter(function(note) {
                return note.task == task.id
              })}/>
              : <NewNoteForm taskId={task.id} handleNoteChange={handleNoteChange} user={user}/> 
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