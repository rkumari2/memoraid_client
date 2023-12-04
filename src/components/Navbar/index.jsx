import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../authContext'
import { IoMdClose } from "react-icons/io"
import { IoLogOutSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg"
import { useSelector } from 'react-redux'
import './style.css'

const Navbar = () => {

  const { isLoggedIn, logout } = useAuth()

  const [ showMenu, setShowMenu ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false)
  // const [ logoutFeedback, setLogoutFeedback ] = useState(false)


  const styles = ({ isActive }) => ({ color: isActive ? '#d6ff89' : '', scale: isActive ? '1.2' : '1', fontWeight: isActive ? 'bold' : 'normal' })

  const navigate = useNavigate()

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
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

  const handleLoginButton = async(e) => {
    e.preventDefault()
    navigate('/login')
  } 

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

  return (
    <div className='page'>
      <nav id='navbar-cont'>
        <div className='large-screen-menu' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
          <div id="logo" onClick={handleLogoClick}>
            <img src="logo3.png" alt="logo" />
          </div>

          <div id="links">
            <NavLink className='navlink' style={styles} to='/'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} > Home </motion.p>
            </NavLink>

            <NavLink className='navlink' style={styles} to='/subjects'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} > Topics </motion.p>
            </NavLink>

            <NavLink className='navlink' style={styles} to='/progress'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} > Progress </motion.p>
            </NavLink>

            <NavLink className='navlink' style={styles} to='/settings'>
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} > Settings </motion.p>
            </NavLink>
          </div>

          <div id='login-btn-navbar'>
            {isLoggedIn ? (
              <NavLink className='navlink' id='logout-link' onClick={handleLogout} > <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> Log Out </motion.p> </NavLink>
            ) : (<motion.button className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleLoginButton} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
              <NavLink id='login-btn-text' to='/login'> Log In </NavLink>
            </motion.button>)}
          </div>
        </div>

        <div className='small-screen-menu' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
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
              <NavLink onClick={handleLogout} className='phone-menu-icon'> <IoLogOutSharp id='small-menu-icon'/> </NavLink>
            ) : (
              <NavLink to='/login' className='phone-menu-icon'> <FaUser id='small-menu-icon'/> </NavLink>
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
