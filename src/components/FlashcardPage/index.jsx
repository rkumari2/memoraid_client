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
import { IoList } from "react-icons/io5";
import { useSelector } from 'react-redux'
import LoadingAnimation from '../LoadingAnimation'
import { motion } from 'framer-motion'
import TextToSpeech from '../TextToSpeech'

const FlashcardPage = () => {

  const { selectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const { responseToken } = useAuth()

  const navigate = useNavigate()

  const initialRightAnswers = localStorage.getItem('rightAnswers') ? parseInt(localStorage.getItem('rightAnswers'), 10) : 0;
  const initialWrongAnswers = localStorage.getItem('wrongAnswers') ? parseInt(localStorage.getItem('wrongAnswers'), 10) : 0;

  const [results, setResults] = useState([])
  const [scoreResults, setScoreResults] = useState([])
  const [revealAnswer, setRevealAnswer] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [rightAnswers, setRightAnswers] = useState(initialRightAnswers)
  const [wrongAnswers, setWrongAnswers] = useState(initialWrongAnswers)
  const [isEndClicked, setIsEndClicked] = useState(false)
  const [finalPercentage, setFinalPercentage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentFlashcardContent, setCurrentFlashcardContent] = useState('');

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
        setCurrentFlashcardContent(responseData.question);
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

  // console.log('stored subject id is line 53:', storedSubjectId)


  const handleShowAnswer = () => {
    setRevealAnswer(true)
    setCurrentFlashcardContent(results[0].answer)
  }

  const handleHideAnswer = () => {
    setRevealAnswer(false)
    setCurrentFlashcardContent(results[0].question)
  }

  const handleRightAnswer = () => {
    const updatedRightAnswers = rightAnswers + 1
    setRightAnswers(updatedRightAnswers)
    setTotalQuestions(totalQuestions + 1)
    localStorage.setItem('rightAnswers', updatedRightAnswers.toString())
    fetchData(selectedSubjectId);
  };

  const handleWrongAnswer = () => {
    const updatedWrongAnswers = wrongAnswers + 1
    setTotalQuestions(totalQuestions + 1)
    setWrongAnswers(updatedWrongAnswers)
    localStorage.setItem('wrongAnswers', updatedWrongAnswers.toString())
    fetchData(selectedSubjectId)
  };

  const handleListBtn = async (e) => {
    e.preventDefault()
    navigate('/all')
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
      percentage = ((rightAnswers / totalQuestions) * 100).toFixed(1)
    }
    setFinalPercentage(percentage)
    // console.log('percentage is', finalPercentage)
    setIsEndClicked(true)
    handleCreateScoreCard(percentage)
  }

  const handleRestart = () => {
    setRevealAnswer(false);
    setTotalQuestions(0);
    setRightAnswers(0);
    setWrongAnswers(0);
    setFinalPercentage(0);
    setIsEndClicked(false);
    localStorage.removeItem('rightAnswers');
    localStorage.removeItem('wrongAnswers');

    const storedSubjectName = localStorage.getItem('selectedSubjectName');
    setSelectedSubjectName(storedSubjectName)
  }

  const handleViewSubjects = () => {
    navigate('/subjects')
  }

  const handleViewScores = () => {
    navigate('/progress')
  }

  const variants = {
    // initial: { rotateY: 0, opacity: [1] },
    question: { rotateY: 0 },
    answer: { rotateY: 180 },
  };

  const innerVariants = {
    initial: { rotateY: 0, opacity: [0, 1] },
    rotated: { rotateY: -180, opacity: [1, 0, 1] },
  };

  return (
    <div className='flashcards-cont' style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}>
      <h1 style={{ lineHeight: '45px' }}><span className='highlight'>{selectedSubjectName}</span> Flashcards</h1>

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
                  <>

                    <motion.div
                      className='flashcard'
                      id='accessibility'
                      animate={revealAnswer ? 'answer' : 'question'}
                      variants={variants}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      style={{ backgroundColor: bgColor }}
                      key={item.id}
                    >
                      <div onClick={revealAnswer ? handleHideAnswer : handleShowAnswer} className='card-content'>
                        <motion.div
                          className='flashcard-type'
                          variants={innerVariants}
                          animate={revealAnswer ? 'rotated' : 'initial'}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        >
                          <h3>{revealAnswer ? 'ANSWER' : 'QUESTION'}</h3>
                        </motion.div>
                        <motion.div
                          className='flashcard-content'
                          variants={innerVariants}
                          animate={revealAnswer ? 'rotated' : 'initial'}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        >
                          <p key={item.id}>{revealAnswer ? item.answer : item.question}</p>
                        </motion.div>
                      </div>
                      <motion.div
                        variants={innerVariants}
                        animate={revealAnswer ? 'rotated' : 'initial'}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="text-to-speech-btns"
                      >
                        <TextToSpeech text={currentFlashcardContent} />
                      </motion.div>
                    </motion.div>

                  </>
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

      {!isLoading && <motion.button className='button' id='list-btn' onClick={handleListBtn} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> <IoList className='icon' id='plus-icon' /> </motion.button>}
    </div>
  )
}

export default FlashcardPage
