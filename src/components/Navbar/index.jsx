import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../authContext'
import './style.css'

const Navbar = () => {

  const { isLoggedIn, setIsLoggedIn, logout, responseToken } = useAuth()

  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
    alert('logout successful')
  }

  const handleLogoClick = async (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='page'>
      <nav id='navbar-cont'> 
        <div id="logo" onClick={handleLogoClick}>
          <img src="logo3.png" alt="logo" />
        </div>

        <div id="links">
            <NavLink className='navlink' to='/'> HOME </NavLink>
            <NavLink className='navlink' to='/subjects'> SUBJECTS </NavLink>
            <NavLink className='navlink' to='/progress'> PROGRESS </NavLink>
            <NavLink className='navlink' to='/settings'> SETTINGS </NavLink>
        </div>

        <div id='login-btn-navbar'>
          { isLoggedIn ? (
            <NavLink className='navlink' id='logout-link' onClick={handleLogout} > LOG OUT </NavLink>
            ) : (<button className='button'>
            <NavLink id='login-btn-text' to='/login'> LOG IN </NavLink>
          </button>) }
        </div>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Navbar
