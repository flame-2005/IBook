import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credential,setcredentials] = useState({email:"",password:""})
    const history = useNavigate()
    const handleSubmit =async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/loginuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credential.email,password:credential.password})
        })
        const json = await response.json()
        console.log(json)

        if (json.success){
            localStorage.setItem('token', json.authtoken);
            props.showAlert("logedin successfully","success")
            history('/')
        }
        else{
            alert("Invalid crediantials")
        }
    }
    const onChange =(e)=>{
        setcredentials({...credential,[e.target.name]:e.target.value})
    }

    return (
        <div className='container' onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
            <div class="row align-items-center g-lg-5 py-5">
      <div class="col-lg-7 text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">Vertically centered hero sign-up form</h1>
        <p class="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>
      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" name='email' onChange={onChange} value={credential.email} aria-describedby="emailHelp" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
          <input type="password"  name='password' class="form-control" value={credential.password} onChange={onChange} id="password" />
            <label for="floatingPassword">Password</label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign up</button>
          <hr class="my-4"/>
          <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </div>
    </div>
            </form>
            <div class="container col-xl-10 col-xxl-8 px-4 py-5">
    
  </div>
        </div>
    )
}

export default Login
