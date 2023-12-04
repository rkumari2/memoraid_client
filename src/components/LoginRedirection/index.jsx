import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const LoginRedirection = () => {

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        navigate('/login')
    }


    return (
        <div className='not-logged-in-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>

            <div className='tagline-home-page'>
                <h1 style={{ lineHeight: '45px' }}> Curious to see more? </h1>
            </div>

            <div className="intro-paragraph">
                <p style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> <span className='highlight'> Log in </span>or <span className='highlight'> Sign up </span> with Memoraid to unlock a treasure trove of flashcards tailored to make learning fun and effective. Let's embark on this learning adventure together! </p>
            </div>


            <div className='buttons-section'>
                <motion.button className='button' onClick={handleClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Log In </motion.button>
                <Link className='hyperlink' to='/register' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> Sign Up </motion.p> </Link>
            </div>

            <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

        </div>
    )
}

export default LoginRedirection
