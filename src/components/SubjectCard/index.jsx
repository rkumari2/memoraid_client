import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'
import { Navigate, useNavigate } from 'react-router-dom'

const SubjectCard = () => {

    const { responseToken } = useAuth()

    const [ results, setResults ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}`)

                if (response.status === 200) {
                    const responseData = response.data

                    if (Array.isArray(responseData)) {
                        setResults (responseData)
                    } else {
                        console.log('data is not an array', responseData)
                    }
                }
            } catch (err) {
                console.log('Error fetching data', err)
            }
        }

        fetchData()
    }, [])

    const handleSubjectClick = () => {
        navigate('/cards')
    }

  return (
    <>
        <ul className='subjectsOutput-cont'>
            { results.length === 0 && (<h1>You don't have any subjects</h1>)}

            {results.map((item) => (
                    <li key={item.div} className='subject-card' onClick={handleSubjectClick}>
                            <p> {item.subject} </p>
                    </li>
            ))}
        </ul>
    </>
  )
}

export default SubjectCard
