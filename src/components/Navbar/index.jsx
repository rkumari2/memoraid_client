import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../authContext'
import './style.css'

const Navbar = () => {

  const { isLoggedIn, logout } = useAuth()

  const styles = ({ isActive }) => ({ color: isActive ? '#d6ff89' : '#FFFFFF', scale: isActive ? '1.2' : '1', fontWeight : isActive ? 'bold' : 'normal'})

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
            <NavLink className='navlink' style={styles} to='/'> HOME </NavLink>
            <NavLink className='navlink' style={styles} to='/subjects'> TOPICS </NavLink>
            <NavLink className='navlink' style={styles} to='/progress'> PROGRESS </NavLink>
            <NavLink className='navlink' style={styles} to='/settings'> SETTINGS </NavLink>
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
