
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Play from './pages/Play.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CreateQuiz from './pages/CreateQuiz.jsx'
import Profile from './pages/Profile.jsx'
import Edit from './pages/Edit.jsx'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/play" element={<Play></Play>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path='/create-quiz' element={<CreateQuiz></CreateQuiz>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/edit' element={<Edit></Edit>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
