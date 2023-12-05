import React from 'react'
import { useAuth } from '../../authContext'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux';

const UserHomePage = () => {

  const { responseToken, isLoggedIn } = useAuth()

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const navigate = useNavigate()

  const handleSubjectClick = (e) => {
    e.preventDefault()
    navigate('/subjects')
  }

  const handleProgressClick = (e) => {
    e.preventDefault()
    navigate('/progress')
  }

  const handleSettingsClick = (e) => {
    e.preventDefault()
    navigate('/settings')
  }

  const isLargeScreen = useMediaQuery({ minWidth: 900 })

  const MotionDiv = isLargeScreen ? motion.div : 'div'

  
  return (
    <div className='logged-in-home-page-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
      { isLoggedIn && responseToken.user ? (<h1 style={{ lineHeight: '45px' }}> Hello, <span className='highlight'> {responseToken.user} </span> </h1>) : (<h1 style={{ lineHeight: '45px' }}>Welcome!</h1>)}

      <p>Let's make today a productive study day.</p>

      <div className='options-section'>
        <MotionDiv className='option' id='option-box' whileHover={isLargeScreen ? {scale:1.1} : {}} whileTap={isLargeScreen ? {scale:0.9} : {}} onClick={handleSubjectClick}>
          <img src="subjects.png" alt="" />
          <h2>View Your Topics</h2>
        </MotionDiv>

        <MotionDiv className='option' id='option-box' whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleProgressClick}>
          <img src="progress.png" alt="" />
          <h2>View Your Progress</h2>
        </MotionDiv>

        <MotionDiv className='option' id='option-box' whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleSettingsClick}>
          <img src="accessibility.png" alt="" />
          <h2>View Your Settings</h2>
        </MotionDiv>
      </div>
      
    </div>
  )
}

export default UserHomePage
