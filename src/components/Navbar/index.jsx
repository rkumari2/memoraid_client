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
            <NavLink className='navlink' to='/'> Home </NavLink>
            <NavLink className='navlink' to='/subjects'> Subjects </NavLink>
            <NavLink className='navlink' to='/settings'> Settings </NavLink>
        </div>

        <div id='login-btn-navbar'>
          <button className='button'>
            <NavLink id='login-btn-text' to='/login'> Log In </NavLink>
          </button>
        </div>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Navbar
