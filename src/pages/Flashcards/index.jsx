import React from 'react'
import { FlashcardPage } from '../../components'
import { useAuth } from '../../authContext'
import './style.css'

const Flashcards = () => {

    const { isLoggedIn } = useAuth()

    return (
        <div className='page-layout'>
            
            {isLoggedIn ? (<FlashcardPage/>) : (<h1> Please Login first </h1>)}
        </div>
    )
}

export default Flashcards
