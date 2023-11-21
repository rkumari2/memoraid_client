import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'
import { Navigate, useNavigate } from 'react-router-dom'

const SubjectCard = () => {

    const { responseToken } = useAuth()

    const [ results, setResults ] = useState([])
    const [ showAddOverlay, setShowAddOverlay ] = useState(false)
    const [ subject, setSubject ] = useState('')

    const navigate = useNavigate()

    const handleShowOverlay = () => {
        setShowAddOverlay(true)
    }

    const handleHideOverlay = () => {
        setShowAddOverlay(false)
        setSubject('')
    }

    const handleAddNew = async () => {
        try {
            const response = await axios.post(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}/new`, {
                subject: subject
            })
            if (response.status === 201) {
                const newSubject = {
                    subject: subject, 
                    id: response.data.id,
                    user_id: responseToken.user_id
                }

                if (newSubject && Object.keys(newSubject).length > 0) {
                    setResults((prevResults) => [...prevResults, newSubject])
                    handleHideOverlay()
                } else {
                    console.error('Invalid new task data in the API response.')
                }
            }
        } catch (err) {
            console.error('Error adding new subject:', err)
        }
    }

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

        <button onClick={handleShowOverlay}> + </button>

        <div id='add-overlay' style={{ display: showAddOverlay ? 'block' : 'none'}}>

            {showAddOverlay && (
                <div>
                    <h2> ADD A NEW SUBJECT </h2>
                    <div>
                        <input 
                            type="text"
                            placeholder='Subject'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <button onClick={handleAddNew}> Add </button>
                        <button onClick={handleHideOverlay}> Cancel </button>
                    </div>
                </div>
            )}

        </div>
    </>
  )
}

export default SubjectCard
