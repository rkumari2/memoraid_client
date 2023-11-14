import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import * as Pages from './pages';
import './style.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<Pages.Home/>}/>
        <Route path='/subjects' element={<Pages.Subjects/>}/>
        <Route path='/settings' element={<Pages.Settings/>}/>
        <Route path='/login' element={<Pages.Login/>}/>
        <Route path='/register' element={<Pages.Register/>}/>
        <Route path='/progress' element={<Pages.Progress/>}/>
      </Route>
    </Routes>
  )
}

export default App
