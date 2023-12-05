import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSubject } from '../../subjectContext'
import { useSelector } from 'react-redux'
import LoadingAnimation from '../LoadingAnimation'
import EditFlashcardBtn from '../EditFlashcardBtn'
import AddFlashcardBtn from '../AddFlashcardBtn'
import { useNavigate } from 'react-router-dom'
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri"
import { RiEdit2Fill } from "react-icons/ri";
import { motion } from 'framer-motion'

const AllQuestionsPage = () => {
  const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const navigate = useNavigate()

  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedFlashcardIdToDelete, setSelectedFlashcardIdToDelete] = useState(null)
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [ clickedFlashcardId, setClickedFlashcardId ] = useState(null)


  const handleShowEditOverlay = (FlashcardId) => {
    setShowEditOverlay(true);
    setClickedFlashcardId(FlashcardId)
  };

  const handleHideEditOverlay = () => {
    setShowEditOverlay(false);
    setEditedQuestion('');
    setEditedAnswer('');
    setClickedFlashcardId(null)
  };

  const handleHideOverlay = () => {
    setShowDeleteConfirmation(false)
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://memoraide-server.onrender.com/flashcards/subjects/${selectedSubjectId}`)
      if (response.status === 200) {
        const responseData = response.data

        if (Array.isArray(responseData)) {
          setResults(responseData)
        } else {
          console.log('data is not an array:', responseData)
        }
      }
    } catch (err) {
      console.log('Error fetching data', err)
    }
    setIsLoading(false)
  }

  useEffect(() => {

    fetchData()
  }, [])

  const handlePractice = async (e) => {
    e.preventDefault()
    navigate('/flashcards')
  }

  const handleDeleteFlashcard = async () => {
    try {
      const response = await axios.delete(`https://memoraide-server.onrender.com/flashcards/cards/${selectedFlashcardIdToDelete}`);
      if (response.status === 204) {
        const updatedResults = results.filter(question => question.id !== selectedFlashcardIdToDelete);
        setResults(updatedResults)
      }
    } catch (error) {
      console.log('Error deleting flashcard', error);
    } finally {
      setShowDeleteConfirmation(false);
      setSelectedFlashcardIdToDelete(null);
    }
  };

  const showDeleteConfirmationOverlay = (flashcardId) => {
    setSelectedFlashcardIdToDelete(flashcardId);
    setShowDeleteConfirmation(true);
  };

  const handleEditFlashcard = async () => {

    try {
      const response = await axios.patch(`https://memoraide-server.onrender.com/flashcards/cards/${clickedFlashcardId}`, {
        question: editedQuestion,
        answer: editedAnswer
      });

      if (response.status === 200) {
        handleHideEditOverlay();
        fetchData();
      }

    } catch (err) {
      console.error('Error editing flashcard:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
      }
    }
  };

  return (
    <div className='questions-cont'>
      <h1 style={{ lineHeight: '45px' }}><span className='highlight'>{selectedSubjectName}</span> Questions </h1>

      <p className='intro-page-text'>
        Check out all the <span className='highlight'>{selectedSubjectName}</span> questions. Easily add more using the <IoMdAdd/> button or tweak existing ones with the <RiEdit2Fill /> button. When you're set, hit 'Practice' and dive into learning!
      </p>

      <motion.button className='button' onClick={handlePractice} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}> Practice </motion.button>

      <div className='questionsOutput-cont'>
        {results.length === 0 && !isLoading && (<div className='no-scores'> No Questions, use + button to add more questions. </div>)}

        {isLoading && (<LoadingAnimation />)}

        {results.map((item) => (
          <div key={item.id} className='question-card' id='accessibility' style={{ backgroundColor: bgColor }} whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>

            <p id='question-paragraph'> {item.question} </p>

              <EditFlashcardBtn flashcardId={item.id} fetchData={fetchData} handleShowEditOverlay={handleShowEditOverlay} setEditedQuestion={setEditedQuestion} setEditedAnswer={setEditedAnswer} handleHideEditOverlay={handleHideEditOverlay} handleEditFlashcard={handleEditFlashcard}/>

              <motion.button className='button' id='delete-btn-question'
                onClick={(e) => {
                  e.stopPropagation()
                  showDeleteConfirmationOverlay(item.id)
                }}
                initial={{ opacity: 0.5 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}>
                <RiDeleteBin6Fill className='icon' id='delete-icon' />
              </motion.button>

          </div>
        ))}
      </div>

      {!isLoading && <AddFlashcardBtn fetchData={fetchData} />}

      {showDeleteConfirmation && (
        <div className='overlay-bg' style={{ display: showDeleteConfirmation ? 'flex' : 'none', fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>

          {showDeleteConfirmation && (
            <div className='overlay'>

              <div id='cancel-sect'>
                <button className='button' id='cancel-btn' onClick={handleHideOverlay}> <IoMdClose className='icon' /> </button>
              </div>

              <p className='delete-text'> Are you sure you want to delete this flashcard? </p>

              <div className='search' id='column-search'>
                <motion.button className='button' id='add-btn' onClick={handleDeleteFlashcard} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Delete </motion.button>
              </div>

            </div>)}

          </div>
      )}


      {showEditOverlay && (
        <div className="overlay-bg" id='edit-overlay' style={{ display: showEditOverlay ? 'flex' : 'none', fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}>

          {showEditOverlay && (
            <div className="overlay">
              <div id='cancel-sect'>
                <button className='button' id='cancel-btn' onClick={handleHideEditOverlay}> <IoMdClose className='icon' /> </button>
              </div>

                <h2> Edit Flashcard </h2>

                <div className='search' id='column-search'>
                  <input
                    className='input-field'
                    id='subject-input'
                    type="text"
                    placeholder='Edited Question'
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}
                  />

                  <input
                    className='input-field'
                    id='subject-input'
                    type="text"
                    placeholder='Edited Answer'
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}
                  />

                  <motion.button
                    className='button'
                    id='add-btn'
                    onClick={handleEditFlashcard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}
                  >
                    Save
                  </motion.button>


                </div>
            </div>
          )}

        </div>
      )}


    </div>
  )
}

export default AllQuestionsPage
