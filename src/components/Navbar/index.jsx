import React, { useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../authContext'
import './style.css'

const Navbar = () => {

  const { isLoggedIn, setIsLoggedIn, logout, responseToken } = useAuth()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
    alert('logout successful')
  }

  return (
    <div className='page'>
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
          { isLoggedIn ? (<NavLink className='navlink' id='logout-link'
              onClick={handleLogout} > LOG OUT </NavLink>) : (<button className='button'>
            <NavLink id='login-btn-text' to='/login'> LOG IN </NavLink>
          </button>) }
        </div>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Navbar
