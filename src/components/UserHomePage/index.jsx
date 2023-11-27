import React from 'react'
import { useAuth } from '../../authContext'
import { useSelector } from 'react-redux';

const UserHomePage = () => {

  const { responseToken, isLoggedIn } = useAuth()

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility);

  return (
    <div className='logged-in-home-page-cont'>
      { isLoggedIn && responseToken.user ? (<h1> Hello, <span className='highlight'> {responseToken.user} </span> </h1>) : (<h1>Welcome!</h1>)}

      <p>Let's make today a productive study day.</p>

      <div className='options-section'>
        <div className='option' id='option-box'>
          <img src="subjects.png" alt="" />
          <h2>View Your Topics</h2>
        </div>

        <div className='option' id='option-box'>
          <img src="progress.png" alt="" />
          <h2>View Your Progress</h2>
        </div>

        <div className='option' id='option-box'>
          <img src="accessibility.png" alt="" />
          <h2>View Your Settings</h2>
        </div>
      </div>
      
    </div>
  )
}

export default UserHomePage
