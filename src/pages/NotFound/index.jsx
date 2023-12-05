import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Notfound = () => {
    const navigate = useNavigate()

    const handleHome = async(e) => {
        e.preventDefault()
        navigate('/')
    }
  return (
    <div className='page-layout'>
        <div className='not-found-page'>
            <img src="not-found.png" alt="sad face drawing" />
            <h3 className='intro-page-text'> Oh no, it appears we've hit a detour. Let's navigate back to the main path of your educational journey. </h3>
            <motion.button className='button' whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} onClick={handleHome}> Home </motion.button>
        </div>

    </div>
  )
}

export default Notfound
