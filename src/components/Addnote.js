import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteState from '../context/NoteState'

const Addnote = (props) => {
  const context = useContext(noteContext)
  const { addNote } = context

  const [note, setNote] = useState({ title: "", discription: "", tag: "default" })
  const handleClick = (e) => {
    e.preventDefault();
    console.log(note.title)
    addNote(note.title,note.discription,note.tag)
    props.showAlert("note added successfully","success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h1>Add your Notes</h1>
      <form>
        <div class="mb-3">
          <label type='text' for="title" class="form-label">title</label>
          <input type="text" class="form-control" id="title" name='title' onChange={onChange} />
        </div>
        <div class="mb-3">
          <label type='text' for="discription" class="form-label">discription</label>
          <input type="text" class="form-control" id="discription" name='discription' onChange={onChange} />
        </div>
        <div class="mb-3">
          <label type='text' for="tag" class="form-label">tag</label>
          <input type="text" class="form-control" id="tag" name='tag' onChange={onChange} />
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default Addnote
