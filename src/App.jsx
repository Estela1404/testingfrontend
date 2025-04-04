import React from 'react'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



const CashOptimi$e = () => {
  return (
    <Router>
        <div className='min-h-screen bg- flex flex-col justify-center items-center'>
        <Routes>
          <Route path='/' element={<Home />} />
           <Route path='/register' element={<Register />} />
           <Route path='/login' element={<Login />} />
        </Routes>  
        </div>
    </Router>

  )
}

export default CashOptimi$e
