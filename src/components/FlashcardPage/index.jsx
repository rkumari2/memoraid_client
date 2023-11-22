import React, { useEffect, useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'

const FlashcardPage = () => {

    const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

    const { responseToken } = useAuth()

    const navigate = useNavigate()

    const [results, setResults] = useState([])
    const [scoreResults, setScoreResults] = useState([])
    const [revealAnswer, setRevealAnswer] = useState(false)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [rightAnswers, setRightAnswers] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState(0)
    const [isEndClicked, setIsEndClicked] = useState(false)
    const [finalPercentage, setFinalPercentage] = useState(0)
    const [showAddOverlay, setShowAddOverlay] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [newCard, setNewCard] = useState([])

    const today = new Date()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const day = today.getDate()
    const currentDate = day + '/' + month + '/' + year
    
    useEffect(() => {
        const storedSubjectId = parseInt(localStorage.getItem('selectedSubjectId'), 10);
        if (storedSubjectId) {
            const storedSubjectName = localStorage.getItem('selectedSubjectName');
            fetchData(storedSubjectId)
            localStorage.setItem('storedSubjectName', storedSubjectName);
        }
    }, [])

    const fetchData = async (storedSubjectId) => {
        try {
            const response = await axios.get(`https://memoraide-server.onrender.com/flashcards/subjects/${storedSubjectId}/random`)

            if (response.status === 200) {
                const responseData = response.data
                setResults([responseData])
                setRevealAnswer(false);
            }

        } catch (err) {
            console.log('Error fetching data', err)
        }
    }

    const handleShowAnswer = () => {
        setRevealAnswer(true)
    }

    const handleHideAnswer = () => {
        setRevealAnswer(false)
    }

    const handleRightAnswer = () => {
        setTotalQuestions(totalQuestions + 1)
        setRightAnswers(rightAnswers + 1)
        fetchData(selectedSubjectId)
    }

    const handleWrongAnswer = () => {
        setTotalQuestions(totalQuestions + 1)
        setWrongAnswers(wrongAnswers + 1)
        fetchData(selectedSubjectId)
    }

    const handleCreateScoreCard = async (newPercentage) => {
        try {
            const response = await axios.post(`https://memoraide-server.onrender.com/scores/${responseToken.user_id}/new`, {
                date: currentDate, 
                totalScore: parseInt(newPercentage, 10),
                rightAnswer: parseInt(rightAnswers, 10),
                totalQuestions: parseInt(totalQuestions, 10),
                subject: selectedSubjectName
            }) 

            if (response.status === 201) {
                const newScore = {
                    id: response.data.id,
                    user_id: responseToken.user_id, 
                    date: currentDate, 
                    totalScore: finalPercentage, 
                    rightAnswer: rightAnswers,
                    totalQuestions: totalQuestions,
                    subject: selectedSubjectName
                }

                if (newScore && Object.keys(newScore).length > 0) {
                    setScoreResults((prevResults) => [ newScore, ...prevResults])
                } else {
                    console.error('Invalid new score data in the API response.')
                }
            }

        } catch (err) {
            console.error('Error adding new score:', err)
        }
    }

    const handleEndButton = () => {
        const percentage = (((rightAnswers / totalQuestions) * 100.).toFixed(1))
        setFinalPercentage(percentage)
        console.log('percentage is', finalPercentage)
        setIsEndClicked(true)
        handleCreateScoreCard(percentage)
    }

    const handleRestart = () => {
        setRevealAnswer(false)
        setTotalQuestions(0)
        setRightAnswers(0)
        setWrongAnswers(0)
        setFinalPercentage(0)
        setIsEndClicked(false)
        const storedSubjectName = localStorage.getItem('selectedSubjectName');
        setSelectedSubjectName(storedSubjectName)
    }

    const handleViewSubjects = () => {
        navigate('/subjects')
    }

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
            <h1>{selectedSubjectName} Flashcards!</h1>

            {isEndClicked ? (
                <div>
                    <h1> your final score is {finalPercentage}%, you did {rightAnswers} questions correct out of {totalQuestions} </h1>
                    <button onClick={handleRestart}> Start Again </button>
                    <button onClick={handleViewSubjects}> View Subjects </button>
                </div>
            ) : (
                <div>
                    <ul>
                        {results.length === 0 ? (<h2> No Flashcards </h2>) : (
                            <div>
                                {revealAnswer ? (
                                    <div onClick={handleHideAnswer}> {results.map((item) => (
                                        <h3 key={item.id}> {item.answer} </h3>
                                    ))} </div>
                                ) : (
                                    <div onClick={handleShowAnswer}> {results.map((item) => (
                                        <h3 key={item.id}> {item.question} </h3>
                                    ))} </div>
                                )}
            
                                <button onClick={handleRightAnswer}>right</button>
                                <button onClick={handleWrongAnswer}>wrong</button>
                                <button onClick={handleEndButton}>end</button>
                            </div>
                        )}
                    </ul>
                </div>
            )}

            <button className='button' id='add-subject-btn' onClick={handleShowOverlay}> + </button>  

            <div className='overlay-bg' style={{ display: showAddOverlay ? 'flex' : 'none'}}>

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

export default FlashcardPage
