import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import noteService from '../services/notes'

function EditNoteForm({taskId,note}) {
  const [show, setShow] = useState(false);
  const noteToEdit = note[0]
  const [url, setUrl] = useState(noteToEdit.url)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const handleEditNote = async (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const logUser = await JSON.parse(loggedUserJSON)
    noteService.setToken(logUser.token)

    const updatedNote = await noteService.update(noteToEdit.id,{
      url: url
    })
    handleClose()
    setUrl('')

  }
  
  const handleDelete = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const logUser = await JSON.parse(loggedUserJSON)
    console.log(noteToEdit)
    noteService.setToken(logUser.token)
    noteService.deleteNote(noteToEdit.id)
    handleClose()

  }

  const handleUrlChange = (e) => setUrl(e.target.value)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Muokkaa suoritusta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            Woohoo, you're reading this text in a modal!
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Linkki</Form.Label>
              <Form.Control as="textarea" rows={2} onChange={handleUrlChange} value={url} />
            </Form.Group>

          </Col>
          <Col>
            <Button variant="danger" onClick={handleDelete}>
              Poista suoritus
            </Button>
          </Col>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Peruuta
          </Button>
          <Button variant="primary" onClick={handleEditNote}>
            Tallenna
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}


function NewNoteForm(taskId) {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewNote = async (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const logUser = await JSON.parse(loggedUserJSON)
    console.log(event)
    console.log(taskId.taskId)
    console.log(logUser.username)
    console.log(url)
    noteService.setToken(logUser.token)
    const note = await noteService.create({
      task: taskId.taskId,
      user: logUser.username,
      url: url
    })
    handleClose()
  }
  
  const handleUrlChange = (e) => setUrl(e.target.value)


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Lisää suoritus
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Suoritus
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Linkki</Form.Label>
              <Form.Control as="textarea" rows={2} onChange={handleUrlChange} value={url} />
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Peruuta
          </Button>
          <Button variant="primary" onClick={handleNewNote}>
            Tallenna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export  {
  EditNoteForm,
  NewNoteForm
}