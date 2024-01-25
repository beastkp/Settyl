import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
