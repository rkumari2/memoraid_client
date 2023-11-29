import React from 'react'
import { useAuth } from '../../authContext'
import './style.css'
import { SubjectsPageLoggedIn } from '../../components'
import LoginRedirection from '../../components/LoginRedirection'


const Subjects = () => {

  const { isLoggedIn } = useAuth()

  return (
    <div className='page-layout'>

      {isLoggedIn ? (<SubjectsPageLoggedIn/>) : ( <LoginRedirection/> )}

    </div>
  )
}

export default Subjects
