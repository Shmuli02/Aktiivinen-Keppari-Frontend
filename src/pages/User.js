import React, {useState, useEffect} from 'react'
import { ProgressBar, Table, Badge, Button } from 'react-bootstrap'
import {EditNoteForm, NewNoteForm} from '../components/Note'
import userServise from '../services/user'

const User = ({tasks,user,notes,handleNoteChange}) => {
  const [userData, setUserData] = useState([])
  const notesId = notes.map(note => note.task)
  const userTasks = tasks.filter(task => notesId.includes(task.id))
  const taskLenght = tasks.length
  const userTasksLenght = userTasks.length
  async function getUserData() {
    const userdata = await userServise.userData({username:user})
    setUserData(userdata[0])
  }
  useEffect( () => {
    getUserData()
  },[])

  return (
  <div className="UserPage">
    <h1>Omat sivut</h1>
    <ProgressBar now={userTasksLenght/taskLenght*100} />
    <p>suoritettu {userTasksLenght}/{taskLenght} tehtävää</p>
    {taskLenght == userTasksLenght ? 
    <div>
      {userData.diploma == '' ?
        <div>
          <p>Olet suorittanut kaikki tehtävät <Badge variant="info">Tarkistuksessa</Badge></p>
        </div> :

        <div>
          <p>Olet suorittanut kaikki tehtävät <Badge variant="success">Tarkistettu</Badge></p>
          <p>Voit ladata diplomin tämän linkin kautta <a className="btn btn-success" href={userData.diploma} target="_blank">Lataa diplomi</a></p>
          

        </div>
        }
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
              ? <EditNoteForm taskId={task.id} handleNoteChange={handleNoteChange} note={notes.filter(function(note) {
                return note.task == task.id
              })}/>
              : '' }
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    </div>
    : <p>ei suorituksia</p>}
  </div>
  )
}

export default User