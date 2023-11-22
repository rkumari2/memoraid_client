import React, { useEffect, useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'
import { FlashcardPage } from '../../components'

const Flashcards = () => {

    return (
        <div className='page-layout'>
            <FlashcardPage/>
        </div>
    )
}

export default Flashcards
