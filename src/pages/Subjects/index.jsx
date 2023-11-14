import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authContext'
import './style.css'
import { SubjectsPageLoggedIn } from '../../components'


const Subjects = () => {

  const { isLoggedIn } = useAuth()

  return (
    <div className='page-layout'>

      {isLoggedIn ? (<SubjectsPageLoggedIn/>) : (
        // <button className='button'> LOG IN </button>
        <SubjectsPageLoggedIn/>
      )}

    </div>
  )
}

export default Subjects
