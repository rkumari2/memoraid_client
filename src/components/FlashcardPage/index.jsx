import React, { useEffect, useState } from 'react'
import { useSubject } from '../../subjectContext'
import axios from 'axios'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import AddFlashcardBtn from '../AddFlashcardBtn'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill, BsRocketTakeoffFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { PiBooksFill } from "react-icons/pi";
import { useSelector } from 'react-redux'
import LoadingAnimation from '../LoadingAnimation'
import { motion } from 'framer-motion'

const FlashcardPage = () => {

  const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

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
  const [isLoading, setIsLoading] = useState(true)

  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const day = today.getDate()
  const currentDate = day + '/' + month + '/' + year

  const storedSubjectId = parseInt(localStorage.getItem('selectedSubjectId'), 10);

  const fetchData = async (storedSubjectId) => {
    try {
      const response = await axios.get(`https://memoraide-server.onrender.com/flashcards/subjects/${storedSubjectId}/random`)

      if (response.status === 200) {
        const responseData = response.data
        setResults([responseData])
        setRevealAnswer(false)
      }

    } catch (err) {
      console.log('Error fetching data', err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    if (storedSubjectId) {
      const storedSubjectName = localStorage.getItem('selectedSubjectName');
      fetchData(storedSubjectId)
      localStorage.setItem('storedSubjectName', storedSubjectName);
      setSelectedSubjectName(storedSubjectName)
    } else {
      setIsLoading(false)
    }
  }, [storedSubjectId])

  console.log('stored subject id is line 53:', storedSubjectId)


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
          setScoreResults((prevResults) => [newScore, ...prevResults])
        } else {
          console.error('Invalid new score data in the API response.')
        }
      }

    } catch (err) {
      console.error('Error adding new score:', err)
    }
  }

  const handleEndButton = () => {
    let percentage;
    if (totalQuestions === 0) {
      percentage = 0;
    } else {
      percentage = ((rightAnswers / totalQuestions) * 100).toFixed(1);
    }
    setFinalPercentage(percentage)
    // console.log('percentage is', finalPercentage)
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

  const handleViewScores = () => {
    navigate('/progress')
  }

  return (
    <div className='flashcards-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
      <h1 style={{ lineHeight: lineSpacing }}><span className='highlight'>{selectedSubjectName}</span> Flashcards</h1>

      {isLoading ? (
        <LoadingAnimation />
      ) : isEndClicked ? (
        <>
        <div className='final-score-cont'>
          <h2> Well Done <span className='highlight'> {responseToken.user} </span>! </h2>
          <div className='score-cont'>
            <h2> Your final score is {finalPercentage}%.</h2>
            <h2> You did <span className='highlight'> {rightAnswers} </span>questions correct out of <span className='highlight'> {totalQuestions}</span>.</h2>
          </div>

          <div className='score-page-btns'>
            <div className='flashcard-actions'>
              <motion.div onClick={handleRestart} className='flashcard-icon' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaCirclePlay />
              </motion.div>
              <p> Restart </p>
            </div>

            <div className='flashcard-actions'>
              <motion.div onClick={handleViewScores} className='flashcard-icon' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
                <BsRocketTakeoffFill />
              </motion.div>
              <p> View Scores </p>
            </div>

            <div className='flashcard-actions'>
              <motion.div onClick={handleViewSubjects} className='flashcard-icon' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
                <PiBooksFill />
              </motion.div>
              <p> View Topics </p>
            </div>
          </div>
        </div>

        <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

      </>
      ) : (
        results.length > 0 ? (
          <div className='card-cont'>
            <div className='flashcardOutput-cont'>
            <div className='actual-card-cont'>
                {results.map((item) => (
                  <motion.div
                    className='flashcard'
                    id='accessibility'
                    style={{
                      backgroundColor: bgColor
                    }}
                    onClick={revealAnswer ? handleHideAnswer : handleShowAnswer}
                    animate={{
                      rotateY: revealAnswer ? [180, 0] : [0, 180, 0]
                    }}
                    transition={{ duration: 1 }}
                    key={item.id}
                  >
                    <div className='flashcard-type'>
                      <h3> {revealAnswer ? 'ANSWER' : 'QUESTION'} </h3>
                    </div>
                    <div className='flashcard-content'>
                      <p key={item.id}> {revealAnswer ? item.answer : item.question} </p>
                    </div>
                  </motion.div>
                ))}

              </div>
            </div>

            <div className='buttons-cont'>
            <div className='flashcard-actions'>
              <motion.div onClick={handleRightAnswer} className='flashcard-icon' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <BsFillHandThumbsUpFill id='thumbs-up' />
              </motion.div>
              <h3> {rightAnswers} </h3>
            </div>

            <div className='flashcard-actions' >
              <motion.div onClick={handleEndButton} className='flashcard-icon' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <MdCancel id='finish' />
              </motion.div>
              <p> Finish </p>
            </div>

            <div className='flashcard-actions'>
              <motion.div onClick={handleWrongAnswer} className='flashcard-icon' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <BsFillHandThumbsDownFill id='thumbs-down' />
              </motion.div>
              <h3> {wrongAnswers} </h3>
            </div>
            </div>
          </div>
        ) : (
          <h2>No Flashcards Available</h2>
        )
      )}

      {!isLoading && !isEndClicked && <AddFlashcardBtn fetchData={fetchData} />}
    </div>
  )
}

export default FlashcardPage
