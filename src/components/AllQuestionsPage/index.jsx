import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSubject } from '../../subjectContext'
import { useSelector } from 'react-redux'
import LoadingAnimation from '../LoadingAnimation'
import EditFlashcardBtn from '../EditFlashcardBtn'
import AddFlashcardBtn from '../AddFlashcardBtn'
import { useNavigate } from 'react-router-dom'

const AllQuestionsPage = () => {
  const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const navigate = useNavigate()

  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedFlashcardIdToDelete, setSelectedFlashcardIdToDelete] = useState(null);

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
        fetchData();
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

  return (
    <div className='flashcards-cont'>
      <h1 style={{ lineHeight: '45px' }}><span className='highlight'>{selectedSubjectName}</span> Questions </h1>

      <p> View all the questions for this topic and edit them by clicking the edit button, practice when ready.</p>

      <button className='button' onClick={handlePractice}> Practice </button>

      <div className='scoresOutput-cont'>
        {results.length === 0 && !isLoading && (<div className='no-scores'> No Questions, use + button to add more questions. </div>)}

        {isLoading && (<LoadingAnimation />)}

        {results.map((item) => (
          <div key={item.id} className='scorecard' id='accessibility' style={{ backgroundColor: bgColor }}>
            <p> {item.question} </p>

            <EditFlashcardBtn flashcardId={item.id} fetchData={fetchData} />
            <button className='button' onClick={() => showDeleteConfirmationOverlay(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {!isLoading && <AddFlashcardBtn fetchData={fetchData} />}

      {showDeleteConfirmation && (
        <div className='overlay-bg'>
          <div className='overlay'>
            <p>Are you sure you want to delete this flashcard?</p>
            <button className='button' onClick={handleDeleteFlashcard}>
              Delete
            </button>
            <button className='button' onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}


    </div>
  )
}

export default AllQuestionsPage
