import React, { useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'

const AddFlashcardBtn = () => {

    const { selectedSubjectId } = useSubject()

    const [showAddOverlay, setShowAddOverlay] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [newCard, setNewCard] = useState([])

    const handleShowOverlay = () => {
        setShowAddOverlay(true)
    }

    const handleHideOverlay = () => {
        setShowAddOverlay(false)
        setQuestion('')
        setAnswer('')
    }

    const handleAddNew = async () => {
        if ((question.trim() === '') || (answer.trim() === '')) {
            alert('You must enter a question and an answer')
            return;
        }

        try {
            const response = await axios.post(`https://memoraide-server.onrender.com/flashcards/subjects/${selectedSubjectId}/new`, {
                question: question,
                answer: answer
            })
            if (response.status === 201) {
                const newFlashcard = {
                    id: response.data.id,
                    question: question,
                    answer: answer,
                    subject_id: selectedSubjectId
                }

                if (newFlashcard && Object.keys(newFlashcard).length > 0) {
                    setNewCard((prevResults) => [newFlashcard, ...prevResults])
                    handleHideOverlay()
                    fetchData(selectedSubjectId)
                } else {
                    console.error('Invalid new flashcard data in the API response.')
                }
            }

        } catch (err) {
            console.error('Error adding new flashcard:', err)
        }
    }

    return (
        <>
            <button className='button' id='add-subject-btn' onClick={handleShowOverlay}> + </button>

            <div className='overlay-bg' style={{ display: showAddOverlay ? 'flex' : 'none' }}>

                {showAddOverlay && (
                    <div className='overlay'>
                        <div id='cancel-sect'>
                            <button className='button' id='cancel-btn' onClick={handleHideOverlay}> X </button>
                        </div>
                        <h2> ADD A NEW FLASHCARD </h2>
                        <div className='search'>
                            <input
                                className='input-field'
                                id='subject-input'
                                type="text"
                                placeholder='Question'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                            <input
                                className='input-field'
                                id='subject-input'
                                type="text"
                                placeholder='Answer'
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            <button className='button' id='add-btn' onClick={handleAddNew}> Add </button>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default AddFlashcardBtn