import React from 'react'
import './style.css'
import { ScoresPage } from '../../components'
import { useAuth } from '../../authContext'
import LoginRedirection from '../../components/LoginRedirection'

const Progress = () => {
  
  const { isLoggedIn } = useAuth()

  return (
    <div className='page-layout'>

      { isLoggedIn ? (<ScoresPage/>) : (<LoginRedirection/>)}
      
    </div>
  )
}

export default Progress
