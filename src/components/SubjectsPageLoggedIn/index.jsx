import React, { useState } from 'react'
import Search from '../Search'
import SubjectCard from '../SubjectCard'
import { useSelector } from 'react-redux';
import LoadingAnimation from '../LoadingAnimation';

const SubjectsPageLoggedIn = () => {

  const { bgColor } = useSelector((state) => state.accessibility);

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
      <h1> Topics </h1>

      <Search handleHideSubject={handleHideSubject} handleShowSubject={handleShowSubject} handleSearch={handleSearch} resetSearch={resetSearch} />

      {/* <div> */}
        {showSubject && !searching ? (<SubjectCard />) : null}

        {/* {!searching && finalSearchResults.length === 0 ? (<LoadingAnimation />) : showSubject ? (<SubjectCard />) : null } */}

        {(searching || finalSearchResults.length > 0) && (
          <ul className='subjectsOutput-cont'>
            {finalSearchResults.map((result) => (
              <li key={result.id} className='subject-card' id='accessibility' style={{backgroundColor: bgColor}}>
                  <p>{result.subject}</p>
              </li>
            ))}
          </ul>
        )}
        {!searching && finalSearchResults.length === 0 && !showSubject && (
          <h3> Nothing to show! </h3>
        )}
      {/* </div> */}

    </div>
  )
}

export default SubjectsPageLoggedIn
