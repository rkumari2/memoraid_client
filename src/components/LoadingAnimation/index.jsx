import React from 'react'
import './style.css'
import { motion } from 'framer-motion'

const LoadingAnimation = () => {
    return (
        <div className='loading-animation'>
        <div className="spinner-box">
            <motion.div className="configure-border-1"
                animate = {{rotate: [0, 90]}}
                transition={{ type: 'linear', duration:1.5, repeat: Infinity }}>
                <div className="configure-core"></div>
            </motion.div>
            <div className="configure-border-2">
                <div className="configure-core"></div>
            </div>
        </div>
        <h3 className='loading-txt'> Loading...</h3>
        </ div>
    )
}

export default LoadingAnimation
