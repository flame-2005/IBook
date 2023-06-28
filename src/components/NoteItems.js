import React, { useContext } from 'react'
import noteContext from '../context/noteContext' 

const NoteItems = (props) => {
    const { notes,updatenote,showAlert } = props
    const context = useContext(noteContext)
    const {deleteNote} = context;
    const {note} = props
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.discription}</p>
                    {/* <i class="fa-solid fa-trash " onClick={()=>{deleteNote(notes._id);props.showAlert("Deleted successfully", "success");}}></i> */}
                    {/* <i class="fa-solid fa-pen-to-square mx-3" onClick={()=>{updatenote(notes)}} ></i> */}
                </div>
            </div>
        </div>
    )
}

export default NoteItems
