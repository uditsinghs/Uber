import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptionLogin from './pages/CaptionPages/CaptionLogin'
import CaptionRegister from './pages/CaptionPages/CaptionRegister'
import UserLogin from './pages/UserPages/UserLogin'
import UserRegister from './pages/UserPages/UserRegister'

const App = () => {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/caption/login" element={<CaptionLogin />}/>
      <Route path="/caption/register" element={<CaptionRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
    </Routes>
  </div>
  )
}

export default App