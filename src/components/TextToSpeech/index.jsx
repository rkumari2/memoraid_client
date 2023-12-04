import React, { useState, useEffect } from "react"
import { FaPlay, FaPause, FaStop } from "react-icons/fa"
import { motion } from "framer-motion"

const TextToSpeech = ({ text }) => {
  const [activeButton, setActiveButton] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const [utterance, setUtterance] = useState(null)

useEffect(() => {
        const synth = window.speechSynthesis
        const u = new SpeechSynthesisUtterance(text)
    
        setUtterance(u)

        setActiveButton(false)
    
        return () => {
          synth.cancel()
        }
      }, [text])
    



  const handlePlay = () => {
    const synth = window.speechSynthesis

    if (isPaused) {
      synth.resume()
      setIsPaused(false)
      setActiveButton("pause")
    } else {
      synth.speak(utterance)
      setIsPaused(false)
      setActiveButton("play")
    }
  }

  const handlePause = () => {
    const synth = window.speechSynthesis
    synth.pause()
    setIsPaused(true)
    setActiveButton("pause")
  }

  const handleStop = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    setIsPaused(false)
    setActiveButton(null)
  }

  return (
    <div className="text-to-speech-btns">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handlePlay}>
        <FaPlay
          className={`icon ${activeButton === "play" ? "active" : ""}`}
          id="accessibility-icon"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handlePause}>
        <FaPause
          className={`icon ${activeButton === "pause" ? "active" : ""}`}
          id="accessibility-icon"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleStop}>
        <FaStop
          className={`icon ${activeButton === null ? "active" : ""}`}
          id="accessibility-icon"
        />
      </motion.div>
    </div>
  )
}

export default TextToSpeech




