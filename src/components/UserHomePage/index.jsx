import React from 'react'
import { useAuth } from '../../authContext'
import { useSelector } from 'react-redux';

const UserHomePage = () => {

  const { responseToken, isLoggedIn } = useAuth()

  const { bgColor } = useSelector(state => state.accessibility);

  console.log('bgColor:', bgColor)

  // console.log('home page responseToken', responseToken)

  return (
    <div className='logged-in-home-page-cont'>
      { isLoggedIn && responseToken.user ? (<h1> Hello, {responseToken.user} </h1>) : (<h1>Welcome!</h1>)}

      <p>Let's make today a productive study day.</p>

      <div className='options-section'>
        <div className='option' style={{ backgroundColor: bgColor }}>
          <h2>View Your Subjects</h2>
          <p>See all your flashcard decks organized by subject. Review, edit or add new decks.</p>
        </div>

        <div className='option'>
          <h2>View Your Subjects</h2>
          <p>lorem ipsum etc etc etc etc</p>
        </div>

        <div className='option'>
          <h2>View Your Subjects</h2>
          <p>Customize text size and more to optimise Memoraid for your learning needs.</p>
        </div>
      </div>
      
    </div>
  )
}

export default UserHomePage
