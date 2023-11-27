import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const GuestHomePage = () => {

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
      <div className='tagline-home-page'>
        <h1> Learn. Recall. Master. </h1>
      </div>

      <div className='intro-paragraph'>
        <p> 
          Are you struggling with traditional flashcards that don't cater to your dyslexia and visual stress? Say hello to Memoraid - the groundbreaking flashcard app designed with you in mind. Customise fonts and color themes to ease your reading experience. With Memoraid, effortlessly transform any study material into an accessible and captivating learning resource. Don't just memorize - Memoraid! </p>
      </div>

      <div className='buttons-section'>
        <button className='button' onClick={handleClick}>LOG IN</button>
        <Link className='hyperlink' to='/register'>SIGN UP</Link>
      </div>

      <img className='bg-image' src="favicon.png" alt="light bulb graphic" />
    </>
  )
}

export default GuestHomePage
