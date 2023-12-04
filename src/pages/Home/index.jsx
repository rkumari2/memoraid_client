import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authContext'
import { GuestHomePage, UserHomePage } from '../../components'

const Home = () => {
  
  const { isLoggedIn } = useAuth()

  return (
    <div className='page-layout'>

      {isLoggedIn ? (<UserHomePage/>) : (<GuestHomePage />)}

    </div>
  )
}

export default Home
