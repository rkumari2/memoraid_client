import React from 'react'
import { useAuth } from '../../authContext'
import './style.css'
import LoginRedirection from '../../components/LoginRedirection'
import { AllQuestionsPage } from '../../components'

const AllQuestion = () => {

    const { isLoggedIn } = useAuth()

  return (
    <div className='page-layout'>
        {isLoggedIn ? (<AllQuestionsPage/>) : (< LoginRedirection />)}
    </div>
  )
}

export default AllQuestion
