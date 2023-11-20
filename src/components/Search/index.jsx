import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../authContext'

const Search = ({ handleHideSubject, handleShowSubject, handleSearch, resetSearch }) => {

    const [ inputText, setInputText ] = useState('')
    const [ results, setResults ] = useState([])
    const [ showOutput, setShowOutput ] = useState(false)

    const { responseToken } = useAuth()

    console.log ('user_id is:', responseToken)

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}`)

                console.log('response is:', response)

                if (response.status === 200) {
                    const responseData = response.data
                    console.log('responseData is:', responseData)

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

    const handleInputChange = (e) => {
        const text = e.target.value
        setInputText(text)
    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        const filteredResults = results.filter(
            (result) => 
            result.subject &&
            result.subject.toLowerCase().includes(inputText.toLowerCase())
        )

        if (filteredResults.length > 0) {
            handleHideSubject()
            handleSearch(filteredResults)
        } else {
            handleShowSubject()
            handleSearch([])
        }

        setShowOutput(true)
    }

    const handleClearClick = () => {
        if (inputText) {
            setInputText('')
            resetSearch()
            handleShowSubject()
        }
    }

  return (
    <div>
        <div>
            <form>
                <label>
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder='Search for a subject'
                    />

                    {inputText && (
                        <button onClick={handleClearClick}> X </button>
                    )}
                </label>
                <button onClick={handleButtonClick}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Search
