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
            <NavLink className='navlink' to='/'> HOME </NavLink>
            <NavLink className='navlink' to='/subjects'> SUBJECTS </NavLink>
            <NavLink className='navlink' to='/settings'> SETTINGS </NavLink>
        </div>

        <div id='login-btn-navbar'>
          <button className='button'>
            <NavLink id='login-btn-text' to='/login'> LOG IN </NavLink>
          </button>
        </div>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Navbar
