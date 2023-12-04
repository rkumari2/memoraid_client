import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingAnimation from '../LoadingAnimation'
import { useSelector } from 'react-redux'


const ScoresPage = () => {

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const [ results, setResults ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const storedToken = JSON.parse(localStorage.getItem('tokenData'))

  useEffect(() => {

    const fetchData = async () => {
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
        
        <div className='scoresOutput-cont'>
          { results.length === 0 && !isLoading && (<div className='no-scores'> <h3> No results to show, practice some more to get results.</h3> <button className='button'> TOPICS </button></div>)}

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
