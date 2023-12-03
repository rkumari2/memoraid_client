import React from 'react'
import { useAuth } from '../../authContext'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

const UserHomePage = () => {

  const { responseToken, isLoggedIn } = useAuth()

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
    <div className='logged-in-home-page-cont'>
      { isLoggedIn && responseToken.user ? (<h1> Hello, <span className='highlight'> {responseToken.user} </span> </h1>) : (<h1>Welcome!</h1>)}

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

        <MotionDiv className='option' id='option-box' whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleSettingsClick} style={{paddingBottom: '500px'}}>
          <img src="accessibility.png" alt="" />
          <h2>View Your Settings</h2>
        </MotionDiv>
      </div>
      
    </div>
  )
}

export default UserHomePage
