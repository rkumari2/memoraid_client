import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const GuestHomePage = () => {

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className='guest-home-page-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
      <div className='tagline-home-page'>
        <h1 style={{ lineHeight: '45px' }}> Learn. Recall. Master. </h1>
      </div>

      <div className='intro-paragraph'>
        <p style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> 
          Are you struggling with traditional flashcards that don't cater to your dyslexia and visual stress? Dive into the world of accessible learning with Memoraid. Beyond offering customisation features like font and colour preferences, we bring you seamless organisation by allowing you to sort flashcards by topic. Take control of your content with easy editing and deletion options, ensuring your study material is always up to date. And with our text-to-speech feature, learning is not just tailored but truly inclusive. </p>
      </div>

      <div className='buttons-section'>
        <motion.button className='button' onClick={handleClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Log In </motion.button>
        <Link className='hyperlink' to='/register'> <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Sign Up </motion.p> </Link>
      </div>

      <img className='bg-image' src="favicon.png" alt="light bulb graphic" />
    </ div>
  )
}

export default GuestHomePage
