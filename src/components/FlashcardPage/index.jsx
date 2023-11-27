import React, { useEffect, useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import AddFlashcardBtn from '../AddFlashcardBtn'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

const FlashcardPage = () => {

    const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

    const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility);

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

    return (
        <div className='flashcards-cont'>
            <h1> <span className='highlight'> {selectedSubjectName} </span> Flashcards </h1>

            {isEndClicked ? (
                <div>
                    <h1> your final score is {finalPercentage}%, you did {rightAnswers} questions correct out of {totalQuestions} </h1>
                    <button onClick={handleRestart}> Start Again </button>
                    <button onClick={handleViewSubjects}> View Subjects </button>
                </div>
            ) : (
                <div className='card-cont'>
                    <ul className='flashcardOutput-cont'>
                        {results.length === 0 ? (<h2> No Flashcards </h2>) : (
                            <div className='actual-card-cont'>
                                {revealAnswer ? (
                                    <div className='flashcard' id='accessibility' style={{backgroundColor: bgColor}} onClick={handleHideAnswer}> {results.map((item) => (
                                        <>
                                        <div key={item.id} className='flashcard-type'>
                                            <h3> ANSWER </h3>
                                        </div>

                                        <div className='flashcard-content'>
                                            <p> {item.answer} </p>
                                        </div> 
                                        </>
                                    ))} </div>
                                ) : (
                                    <div className='flashcard' id='accessibility' style={{backgroundColor: bgColor}} onClick={handleShowAnswer}> {results.map((item) => (
                                        <>
                                        <div key={item.id} className='flashcard-type'>
                                            <h3> QUESTION </h3>
                                        </div>

                                        <div className='flashcard-content'>
                                            <p key={item.id}> {item.question} </p>
                                        </div>
                                        </>
                                    ))} </div>
                                )}
                            </div>
                        )}
                    </ul>

                    <div className='buttons-cont'>
                        <div className='flashcard-actions'>
                            <div onClick={handleRightAnswer} className='flashcard-icon' > 
                                <BsFillHandThumbsUpFill id='thumbs-up' /> 
                            </div>
                            <h3> {rightAnswers} </h3>
                        </div>

                        <div className='flashcard-actions' >
                            <div onClick={handleEndButton} className='flashcard-icon' > 
                                <MdCancel id='finish' />
                            </div>
                            <p> Finish </p>
                        </div>

                        <div className='flashcard-actions'>
                            <div onClick={handleWrongAnswer} className='flashcard-icon' > 
                                <BsFillHandThumbsDownFill id='thumbs-down' /> 
                            </div>
                            <h3> {wrongAnswers} </h3>
                        </div>
                    </div>

                </div>
            )}

            <AddFlashcardBtn/>

        </div>
    )
}

export default FlashcardPage
