import React, { useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const AddFlashcardBtn = ({fetchData}) => {

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

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
            if (err.response) {
                console.error('Server response:', err.response.data);
              }
        }
    }

    return (
        <>
            <motion.button className='button' id='add-subject-btn' onClick={handleShowOverlay} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> <IoMdAdd className='icon' id='plus-icon'/> </motion.button>

            <div className='overlay-bg' style={{ display: showAddOverlay ? 'flex' : 'none', fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>

                {showAddOverlay && (
                    <div className='overlay'>
                        <div id='cancel-sect'>
                            <button className='button' id='cancel-btn' onClick={handleHideOverlay}> <IoMdClose className='icon' /> </button>
                        </div>
                        <h2> ADD A NEW FLASHCARD </h2>
                        <div className='search' id='column-search' >
                            <input
                                className='input-field'
                                id='subject-input'
                                type="text"
                                placeholder='Question'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}
                            />
                            <input
                                className='input-field'
                                id='subject-input'
                                type="text"
                                placeholder='Answer'
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}
                            />
                            <motion.button className='button' id='add-btn' onClick={handleAddNew} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Add </motion.button>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default AddFlashcardBtn
