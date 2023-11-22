import React, { useEffect, useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'
import { useAuth } from '../../authContext'

const FlashcardPage = () => {

    const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

    const { responseToken } = useAuth()
    console.log('user_id is:', responseToken.user_id)


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
    // console.log('date', currentDate)

    // console.log('flashcard page id of subject:', selectedSubjectId)

    // console.log('right answers', rightAnswers)
    // console.log('total questions', totalQuestions)
    // console.log(isEndClicked)

    useEffect(() => {
        const storedSubjectId = parseInt(localStorage.getItem('selectedSubjectId'), 10);
        if (storedSubjectId) {
            const storedSubjectName = localStorage.getItem('selectedSubjectName');
            fetchData(storedSubjectId)
            localStorage.setItem('storedSubjectName', storedSubjectName);
        }
    }, [])

    // const storedSubjectName = localStorage.getItem('storedSubjectName')
    // console.log('line 31 flashcard', storedSubjectName)

    const fetchData = async (storedSubjectId) => {
        try {
            const response = await axios.get(`https://memoraide-server.onrender.com/flashcards/subjects/${storedSubjectId}/random`)

            // console.log('response from flashcard page is:', response)

            if (response.status === 200) {
                const responseData = response.data
                setResults([responseData])
                setRevealAnswer(false);

                // if (Array.isArray(responseData)) {
                //     setResults(responseData)
                //     console.log('responseData:', results)
                // } else {
                //     console.log('data is not an array', responseData)
                // }

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
            const response = await axios.post(`http://localhost:3000/scores/${responseToken.user_id}/new`, {
                // user_id: responseToken.id,     
                date: currentDate, 
                totalScore: parseInt(newPercentage, 10),
                rightAnswer: parseInt(rightAnswers, 10),
                totalQuestions: parseInt(totalQuestions, 10),
                subject: selectedSubjectName
            }) 
            console.log (response)
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
        const percentage = (rightAnswers / totalQuestions) * 100
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
        // fetchData(selectedSubjectId)
    }

    return (
        <>
            <h1>{selectedSubjectName} Flashcards!</h1>

            {isEndClicked ? (
                <div>
                    <h1> your final score is {finalPercentage}%, you did {rightAnswers} questions correct out of {totalQuestions} </h1>
                    <button onClick={handleRestart}> Start again </button>
                </div>
            ) : (
                <div>
                    <ul>
                        {results.length === 0 && (<h2> No Flashcards </h2>)}
                    </ul>

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
        </>
    )
}

export default FlashcardPage
