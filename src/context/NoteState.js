import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
//get all notes
const notesInitial = []
const [notes,setNotes] = useState(notesInitial)
const host = 'http://localhost:5000'

const getNotes = async()=>{
  //API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      'auth-token': localStorage.getItem('token')
    }
  })
  const json = await response.json()
  setNotes(json)
  
}
// getting Auther of the note
const getAuther = async()=>{
  //API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      'auth-token': localStorage.getItem('token')
    }
  })
  const json = await response.json()
  setNotes(json)
  
}


    
    
    //add a note
    const addNote = async (title,discription,tag)=>{
      const response = await fetch(`${host}/api/notes/addnotes`,{
        method : "POST",
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,discription,tag})
      })
      const json = await response.json()
      setNotes(notes.concat(json))
    }
    //delete a note
    const deleteNote = async(id)=>{
      //todo api
      console.log(id)
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'appilication/json',
          "auth-token":localStorage.getItem('token')
        }
      })
      const json = response.JSON
      console.log(json)

      const Newnotes = notes.filter((notes)=>{return notes._id !== id})
      setNotes(Newnotes)
    }
    // edit a Note
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }


    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,getNotes,editNote,getAuther}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState