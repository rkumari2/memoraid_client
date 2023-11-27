import React from 'react'
import { useAuth } from '../../authContext'
import './style.css'
import { SubjectsPageLoggedIn } from '../../components'
import LoadingAnimation from '../../components/LoadingAnimation'


const Subjects = () => {

  const { isLoggedIn } = useAuth()

  return (
    <div className='page-layout'>

      {isLoggedIn ? (<SubjectsPageLoggedIn/>) : (
        <LoadingAnimation />
      )}

    </div>
  )
}

export default Subjects
