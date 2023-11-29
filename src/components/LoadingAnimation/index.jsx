import React from 'react'
import './style.css'
import { motion } from 'framer-motion'

const LoadingAnimation = () => {
    return (
        <div class='loading-animation'>
        <div class="spinner-box">
            <motion.div class="configure-border-1"
                animate = {{rotate: [0, 90]}}
                transition={{ type: 'linear', duration:1.5, repeat: Infinity }}>
                <div class="configure-core"></div>
            </motion.div>
            <div class="configure-border-2">
                <div class="configure-core"></div>
            </div>
        </div>
        <h3 className='loading-txt'> Loading...</h3>
        </ div>
    )
}

export default LoadingAnimation
