import React, { useEffect, useState } from 'react'
import axios from 'axios'


const ScoresPage = () => {

    const [results, setResults] = useState([])

  const storedToken = JSON.parse(localStorage.getItem('tokenData'))

  console.log('line 13:', storedToken)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://memoraide-server.onrender.com/scores/${storedToken.user_id}`)
        if (response.status === 200) {
          const responseData = response.data

          if (Array.isArray(responseData)) {
            console.log('responseData:', responseData);

            setResults(responseData)
          } else {
            console.log('data is not an array:', responseData)
          }
        }
      } catch (err) {
        console.log('Error fetching data', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='scores-cont'>
        <h1> PROGRESS </h1>
        
        <div className='scoresOutput-cont'>
          { results.length === 0 && (<div> <h1> No results to show, practice some more to get results.</h1> <button className='button'> SUBJECTS </button></div>)}
  
          { results.map((item) => (
            <div key={item.id} className='scorecard'>
              <h2> {item.totalScore}% </h2>
              <p> {item.subject} </p>
              <p> {item.date} </p>
              <p> {item.rightAnswer} out of {item.totalQuestions} </p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ScoresPage
