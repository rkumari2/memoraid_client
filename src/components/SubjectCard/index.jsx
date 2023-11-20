import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'

const SubjectCard = () => {

    const { responseToken } = useAuth()


    const [ results, setResults ] = useState([])

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

  return (
    <div>
        <div>
            <ul>
                {results.map((item) => (
                    <li>
                        <div>
                            <h3> {item.subject} </h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default SubjectCard
