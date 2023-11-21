import React from 'react'
import { useSubject } from '../../subjectContext'

const Flashcards = () => {

    const { selectedSubjectId } = useSubject()

    console.log('flashcard page id of subject:', selectedSubjectId)
    
  return (
    <div className='page-layout'>
        <h1>This is the Flashcards Page</h1>
    </div>
  )
}

export default Flashcards
