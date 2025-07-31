import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Play from './pages/Play.jsx'


function App() {
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/play" element={<Play></Play>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
