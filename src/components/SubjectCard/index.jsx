import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import { useSubject } from '../../subjectContext'
import AddSubjectBtn from '../AddSubjectBtn'
import { useSelector } from 'react-redux';
import LoadingAnimation from '../LoadingAnimation'

const SubjectCard = () => {

    const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility);

    const { responseToken } = useAuth()

    const [results, setResults] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    const { selectedSubjectId, setSelectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}`)

                if (response.status === 200) {
                    const responseData = response.data

                    if (Array.isArray(responseData)) {
                        setResults(responseData)
                        setIsLoading(false)
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

    const handleSubjectClick = (id, name) => {
        localStorage.setItem('selectedSubjectId', id);
        localStorage.setItem('selectedSubjectName', name);
        setSelectedSubjectId(id);
        setSelectedSubjectName(name);
        navigate('/flashcards');
    }

    useEffect(() => {
        if (selectedSubjectId && selectedSubjectName) {
            localStorage.setItem('selectedSubjectId', selectedSubjectId)
            localStorage.setItem('selectedSubjectName', selectedSubjectName)
        }
    }, [selectedSubjectId, selectedSubjectName]);


    return (
        <>
            <ul className='subjectsOutput-cont'>
                {results.length === 0 && !isLoading && (<h1>You don't have any subjects</h1>)}

                {isLoading && (<LoadingAnimation/>)}

                {results.map((item) => (
                    <li key={item.id} className='subject-card' 
                    id='accessibility' style={{backgroundColor: bgColor}}
                    onClick={() => handleSubjectClick(item.id, item.subject)}>
                        <p> {item.subject} </p>
                    </li>
                ))}
            </ul>

            <AddSubjectBtn results={results} setResults={setResults} />
        </>
    )
}

export default SubjectCard
