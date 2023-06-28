import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItems from './NoteItems'
import Addnote from './Addnote'
import {useNavigate} from 'react-router-dom'


const Notes = (props) => {
  const {showAlert} = props
  const context = useContext(noteContext)
  const { notes, getNotes,editNote } = context
  const history = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log('hi')
      getNotes()
    }
    else{
      console.log('buy')
      history('/login')
    }  
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const updatenote = (currentnotes) => {
    console.log("update")
    ref.current.click()
    setNote({id:currentnotes._id,etitle:currentnotes.title,ediscription:currentnotes.discription,etag:currentnotes.tag})
  }
  const [note, setNote] = useState({id:"",etitle: "", ediscription: "", etag: "" })
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.ediscription,note.etag)
    console.log("updating the note..",note)
    refClose.current.click()
    props.showAlert("note updated successfully","success")

  }

  return (
    <>
      <Addnote showAlert={showAlert} />

      <button type="button" ref={ref} class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label type='text' for="etitle" class="form-label" >title</label>
                  <input type="text" class="form-control" id="etitle" name='etitle' onChange={onChange} value={note.etitle} />
                </div>
                <div class="mb-3">
                  <label type='text' for="ediscription" class="form-label" >discription</label>
                  <input type="text" class="form-control" id="ediscription" name='ediscription' onChange={onChange} value={note.ediscription}/>
                </div>
                <div class="mb-3">
                  <label type='text' for="etag" class="form-label" >tag</label>
                  <input type="text" class="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                </div>
                <button type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" ref={refClose} class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Notes nots added by public</h2>
        <div className="container">
          {notes.length ===0 && "no notes to display"}
          </div>
        {notes.map((notes) => {
          return <NoteItems notes={notes} updatenote={updatenote} key={notes._id} showAlert={showAlert} />
        })}

      </div>

    </>
  )
}

export default Notes
