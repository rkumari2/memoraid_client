import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingAnimation from '../LoadingAnimation'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'


const ScoresPage = () => {

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const [ results, setResults ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const storedToken = JSON.parse(localStorage.getItem('tokenData'))

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`https://memoraide-server.onrender.com/scores/${storedToken.user_id}`)
        if (response.status === 200) {
          const responseData = response.data
          if (Array.isArray(responseData)) {
            setResults(responseData)
          } else {
            console.log('data is not an array:', responseData)
          }

        setIsLoading(false)

        }
      } catch (err) {
        console.log('Error fetching data', err)
      }
    }

    fetchData()
  }, [])

  return (
    <>

    <div className='scores-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
        <h1 style={{ lineHeight: '45px' }}> Progress </h1>

        <p className='intro-page-text'> Your study sessions, at a glance. The Progress Page shows how you're doing in each topic and how many questions you've aced. </p>
        
        <div className='scoresOutput-cont'>
          { results.length === 0 && !isLoading && (<div className='no-scores'> <h3> No scores yet? No worries! Dive into more practice sessions to unveil your achievements. The more you practice, the more you'll conquer. You're on the right track! </h3> <motion.button className='button' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}> Topics </motion.button></div>)}

          { isLoading && (<LoadingAnimation />)}
          { results.map((item) => (
            <div key={item.id} className='scorecard' id='accessibility' style={{backgroundColor: bgColor}}>
              <h2> {item.totalScore}% </h2>
              <p> {item.subject} </p>
              <p> {item.date} </p>
              <p> {item.rightAnswer} right out of {item.totalQuestions} </p>
            </div>
          ))}
        </div>

    </div>

    <img className='bg-image' src="favicon.png" alt="light bulb graphic" />
        
    </>
  )
}

export default ScoresPage
