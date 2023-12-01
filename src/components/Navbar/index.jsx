import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../authContext'
import { IoMdClose } from "react-icons/io"
import { CgMenuGridR } from "react-icons/cg"
import './style.css'

const Navbar = () => {

  const { isLoggedIn, logout } = useAuth()

  const [showMenu, setShowMenu] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const styles = ({ isActive }) => ({ color: isActive ? '#d6ff89' : '', scale: isActive ? '1.2' : '1', fontWeight: isActive ? 'bold' : 'normal' })

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

  const toggleOpen = () => {
    setShowMenu(true)
    setIsOpen(true)
  }

  const toggleClose = () => {
    setShowMenu(false)
    setIsOpen(false)
  }

  const hideMenu = () => {
    setShowMenu(false)
    setIsOpen(false)
  }

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

  return (
    <div className='page'>
      <nav id='navbar-cont'>
        <div className='large-screen-menu'>
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
            {isLoggedIn ? (
              <NavLink className='navlink' id='logout-link' onClick={handleLogout} > <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> LOG OUT </motion.p> </NavLink>
            ) : (<motion.button className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink id='login-btn-text' to='/login'> LOG IN </NavLink>
            </motion.button>)}
          </div>
        </div>

        <div className='small-screen-menu'>
          {!isOpen ? (
            <div onClick={toggleOpen} className='phone-menu-icon'>
              <CgMenuGridR id='small-menu-icon' />
            </div>
          ) : (
            <div onClick={toggleClose} className='phone-menu-icon'>
              <IoMdClose id='small-menu-icon' />
            </div>
          )}

          <div id="logo" onClick={handleLogoClick}>
            <img src="logo3.png" alt="logo" />
          </div>

          <div id='login-btn-navbar'>
            {isLoggedIn ? (
              <NavLink className='navlink' id='logout-link' onClick={handleLogout} > LOG OUT </NavLink>
            ) : (
              <NavLink id='login-btn-text' to='/login'> LOG IN </NavLink>
            )}
          </div>

        </div>

        <motion.div className={`menu-links ${showMenu ? 'active' : ''}`}
            animate={isOpen ? "open" : "closed"}
            variants={variants}>
              <div id='links'>
                <NavLink className='navlink' style={styles} to='/' onClick={hideMenu}> HOME </NavLink>

                <NavLink className='navlink' style={styles} to='/subjects' onClick={hideMenu}> TOPICS </NavLink>

                <NavLink className='navlink' style={styles} to='/progress' onClick={hideMenu}> PROGRESS </NavLink>

                <NavLink className='navlink' style={styles} to='/settings' onClick={hideMenu}> SETTINGS </NavLink>
              </div>
          </motion.div>

      </nav>

      <Outlet />

    </div>
  )
}

export default Navbar
