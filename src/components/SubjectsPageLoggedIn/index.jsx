import React, { useState } from 'react'
import Search from '../Search'
import SubjectCard from '../SubjectCard'

const SubjectsPageLoggedIn = () => {

  const [ showSubject, setShowSubject ] = useState(true)
  const [ finalSearchResults, SetFinalSearchResults ] = useState([])
  const [ searching, setSearching ] = useState(false) 

  const handleShowSubject = () => {
    setShowSubject(true)
    SetFinalSearchResults([])
    setSearching(false)
  }

  const handleHideSubject = () => {
    setShowSubject(false)
    SetFinalSearchResults([])
    setSearching(true)
  }

  const handleSearch = (results) => {
    SetFinalSearchResults(results)
    if (searching === false) {
      setShowSubject(false)
    } else {
      setShowSubject(true)
    }
  }

  const resetSearch = () => {
    setSearching(false)
  }

  return (
    <div className='subjects-cont'>
      <h1> SUBJECTS </h1>

      <Search handleHideSubject={handleHideSubject} handleShowSubject={handleShowSubject} handleSearch={handleSearch} resetSearch={resetSearch} />

      <div>
        {showSubject && !searching ? (<SubjectCard/>) : null}

        {(searching || finalSearchResults.length > 0) && (
          <ul className='subjectsOutput-cont'>
            {finalSearchResults.map((result) => (
              <li key={result.id} className='subject-card'>
                  <p>{result.subject}</p>
              </li>
            ))}
          </ul>
        )}
        {!searching && finalSearchResults.length === 0 && !showSubject && (
          <h3> Nothing to show! </h3>
        )}
      </div>

    </div>
  )
}

export default SubjectsPageLoggedIn
