import React, {useCallback, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import noteService from '../services/notes'
import Upload from './Upload'
import "bootstrap/dist/css/bootstrap.min.css";

import UploadFiles from "../components/upload-files";

function EditNoteForm({taskId,note,handleNoteChange,title}) {
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
    noteService.setToken(logUser.token)
    noteService.deleteNote(noteToEdit.id)
    handleNoteChange()
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
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Linkki</Form.Label>
              <Form.Control as="textarea" rows={2} onChange={handleUrlChange} value={url} placeholder="linkki"/>
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


function NewNoteForm({taskId,handleNoteChange,user,title}) {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('')
  const [allowedToPublish, setAllowedToPublish] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleNewNote = async (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const logUser = await JSON.parse(loggedUserJSON)
    noteService.setToken(logUser.token)
    const note = await noteService.create({
      task: taskId,
      user: logUser.username,
      url: url,
      allowedToPublish: allowedToPublish

    })
    handleNoteChange()
    setAllowedToPublish(false)
    handleClose()
  }
  
  const handleUrlChange = (e) => setUrl(e.target.value)

  const handleCheckChange = (e) => setAllowedToPublish(e.target.checked)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Lis???? suoritus
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
          <Form.Label>Lataa tiedosto tai lis???? linkki</Form.Label>
            <div className="container" style={{ width: "300" }}>
              <UploadFiles user={user}/>
            </div>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={2} onChange={handleUrlChange} value={url} placeholder="linkki"/>
            </Form.Group>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="kuvan/videon saa julkaista galleriassa"  onChange={handleCheckChange}/>
            </Form.Group>

            </Col>
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

async function getNotes() {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const logUser = await JSON.parse(loggedUserJSON)
    const notes = await noteService.getAll()
    const note2 = await notes.filter(note => note.user.username === logUser.username)
    return note2
  }
}

export  {
  EditNoteForm,
  NewNoteForm,
  getNotes
}