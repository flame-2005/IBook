import { useState } from "react"
import React from 'react'
import {useNavigate} from 'react-router-dom'

const Singup = (props) => {
    const [credential,setcredentials] = useState({name:"",email:"",password:"",ConformPassword:""})
    const history = useNavigate()
    const handleSubmit =async(e)=>{
        const {name,email,password} = credential
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        })
        const json = await response.json()
        console.log(json)

        if (json.success){
            localStorage.setItem('token',json.authtoken);
            history('/')
            props.showAlert("Account Created successfully","success")
        }
        else{
            console.log(credential.name,credential.email,credential.password)
            props.showAlert("please fill ass the details correctly","danger")
        }
    }
    const onChange =(e)=>{
        setcredentials({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" name='name'  class="form-control" onChange={onChange} id="name"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" name='password' class="form-control" onChange={onChange} required minLength={5} id="password"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Conform Password</label>
    <input type="password" name='ConformPassword' class="form-control" onChange={onChange} required minLength={5} id="ConformPassword"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Singup
