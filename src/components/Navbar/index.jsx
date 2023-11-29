import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
            <NavLink className='navlink' style={styles} to='/'> 
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> HOME </motion.p>
            </NavLink>

            <NavLink className='navlink' style={styles} to='/subjects'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> TOPICS </motion.p>
            </NavLink>

            <NavLink className='navlink' style={styles} to='/progress'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> PROGRESS </motion.p>
            </NavLink>

            <NavLink className='navlink' style={styles} to='/settings'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> SETTINGS </motion.p>
            </NavLink>
        </div>

        <div id='login-btn-navbar'>
          { isLoggedIn ? (
            <NavLink className='navlink' id='logout-link' onClick={handleLogout} > <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> LOG OUT </motion.p> </NavLink>
            ) : (<motion.button className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <NavLink id='login-btn-text' to='/login'> LOG IN </NavLink>
          </motion.button>) }
        </div>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Navbar
