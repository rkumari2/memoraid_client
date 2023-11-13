import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='page-layout'>

      {/* <img src="favicon2.svg" alt="" /> */}

      <div className='tagline-home-page'>
        <h1> LEARN. RECALL. MASTER. </h1>
      </div>

      <div className='intro-paragraph'>
        <p> Tired of traditional flashcards that aren't adaptable to your learning needs? Welcome to Memoraid - the innovative flashcard app that makes studying accessible for all. Easily adjust font sizes and color themes to suit your needs. On Memoraid, it's easy to turn any study material into an accessible, engaging learning tool. Don't just memorise - Memoraid! </p>
      </div>

      <div className='buttons-section'>
        <button className='button'>LOG IN</button>
        <Link className='hyperlink' to='/register'>SIGN UP</Link>
      </div>
    </div>
  )
}

export default Home
