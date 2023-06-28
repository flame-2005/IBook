import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';
import { useState } from 'react';


function App() {
  const [alert,newAlert] = useState(null);

  const showAlert = (message,type) => {
    newAlert({
      msg:message,
      Type:type
    })
    setTimeout(() => {
      newAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert = {alert}/>
    <Routes>
        <Route exact path="/about" element = {<About/>}>
          
          </Route>
        <Route exact path="/" element = { <Home showAlert={showAlert}/> }>
         
          </Route>
        <Route exact path="/login" element = { <Login showAlert={showAlert}/>}>
         
          </Route>
        <Route exact path="/singup" element = { <Singup showAlert={showAlert}/>}>
         
          </Route>
        
      </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
