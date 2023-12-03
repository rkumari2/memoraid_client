import React from 'react'
import { FlashcardPage } from '../../components'
import { useAuth } from '../../authContext'
import './style.css'
import LoginRedirection from '../../components/LoginRedirection'

const Flashcards = () => {

    const { isLoggedIn } = useAuth()

    return (
        <div className='page-layout'>
            
            {isLoggedIn ? (<FlashcardPage/>) : (< LoginRedirection />)}
        </div>
    )
}

export default Flashcards
