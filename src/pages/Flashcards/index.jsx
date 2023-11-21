import React, { useEffect, useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'

const Flashcards = () => {

    const { selectedSubjectId } = useSubject()

    const [results, setResults] = useState([])
    const [ revealAnswer, setRevealAnswer ] = useState(false)

    // console.log('flashcard page id of subject:', selectedSubjectId)

    useEffect(() => {
        const storedSubjectId = parseInt(localStorage.getItem('selectedSubjectId'), 10)
        if (storedSubjectId) {
            fetchData(storedSubjectId)
        }
    }, [selectedSubjectId])

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

    const handleNextQuestion = () => {
        fetchData(selectedSubjectId);
    };

    return (
        <div className='page-layout'>
            <h1>This is the Flashcards Page</h1>

            <ul>
                { results.length === 0 && (<h2> No Flashcards </h2>)}

            </ul>

            {revealAnswer ? (
                <div onClick={handleHideAnswer}> {results.map((item) => (
                    <h3> {item.answer} </h3>
                ))} </div>
            ) : (
                <div onClick={handleShowAnswer}> {results.map((item) => (
                    <h3> {item.question} </h3>
                ))} </div>
            )}

            <button onClick={handleNextQuestion}>Next Question</button>

        </div>
    )
}

export default Flashcards
