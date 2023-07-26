import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import UserProfile from './pages/UserProfile'
import FriendProfile from './pages/FriendProfile'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/friendProfile/:userId" element={<FriendProfile/>} />
        <Route path='/' element = {<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App