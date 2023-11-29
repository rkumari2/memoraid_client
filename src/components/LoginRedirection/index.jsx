import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LoginRedirection = () => {

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        navigate('/login')
    }


    return (
        <div className='not-logged-in-cont'>

            <div className='tagline-home-page'>
                <h1> Curious to see more? </h1>
            </div>

            <div className="intro-paragraph">
                <p> <span className='highlight'> Log in </span>or <span className='highlight'> Sign up </span> with Memoraid to unlock a treasure trove of flashcards tailored to make learning fun and effective. Let's embark on this learning adventure together! </p>
            </div>


            <div className='buttons-section'>
                <button className='button' onClick={handleClick}>LOG IN</button>
                <Link className='hyperlink' to='/register'>SIGN UP</Link>
            </div>

            <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

        </div>
    )
}

export default LoginRedirection
