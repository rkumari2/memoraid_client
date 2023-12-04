import React, { useState, useEffect} from 'react'
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

  const [ results, setResults ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const fetchData = async() => {
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

            setIsLoading(false)
        }
    } catch (error) {
        console.log('Error fetching data', err)
    }
}

  useEffect(() => {

    fetchData()
  }, [])

  const handlePractice = async(e) => {
    e.preventDefault()
    navigate('/flashcards')
  }

  return (
    <div className='flashcards-cont'>
        <h1 style={{ lineHeight: '45px' }}><span className='highlight'>{selectedSubjectName}</span> Questions </h1>

        <p> View all the questions for this topic and edit them by clicking the edit button, practice when ready.</p>

        <button className='button' onClick={handlePractice}> Practice </button>

        <div className='scoresOutput-cont'>
            { results.length === 0 && !isLoading && (<div className='no-scores'> No Questions, use + button to add more questions. </div>)}

            { isLoading && (<LoadingAnimation />)} 

            { results.map((item) => (
                <div key={item.id} className='scorecard' id='accessibility' style={{backgroundColor: bgColor}}>
                    <p> {item.question} </p>
                    
                    <EditFlashcardBtn flashcardId={item.id} fetchData={fetchData}/>
                </div>
            ))}
        </div>

        {!isLoading && <AddFlashcardBtn fetchData={fetchData} />}


    </div>
  )
}

export default AllQuestionsPage
