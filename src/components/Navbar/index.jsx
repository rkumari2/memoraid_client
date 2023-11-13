import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './style.css'

const Navbar = () => {
  return (
    <div id='page'>
      <nav id='navbar-cont'> 
        <div id="logo">
          <img src="logo.svg" alt="" />
        </div>

        <div id="links">
            <NavLink to='/'> Home </NavLink>
            <NavLink to='/subjects'> Subjects </NavLink>
            <NavLink to='/settings'> Settings </NavLink>
            <NavLink to='/login'> Log In </NavLink>
        </div>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Navbar
