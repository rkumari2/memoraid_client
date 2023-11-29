import React, { useState, useEffect } from 'react'
import Search from '../Search'
import SubjectCard from '../SubjectCard'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useSubject } from '../../subjectContext'
import { useNavigate } from 'react-router-dom';


const SubjectsPageLoggedIn = () => {

  const { bgColor } = useSelector((state) => state.accessibility)

  const navigate = useNavigate()

  const { selectedSubjectId, setSelectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

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
    <div className='subjects-cont'>
      <h1> Topics </h1>

      <Search handleHideSubject={handleHideSubject} handleShowSubject={handleShowSubject} handleSearch={handleSearch} resetSearch={resetSearch} />

        {showSubject && !searching ? (<SubjectCard handleSubjectClick={handleSubjectClick}/>) : null}

        {(searching || finalSearchResults.length > 0) && (
          <div className='subjectsOutput-cont'>
            {finalSearchResults.map((result) => (
              <motion.div key={result.id} className='subject-card' id='accessibility' style={{backgroundColor: bgColor}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleSubjectClick(result.id, result.subject)}>
                  <p>{result.subject}</p>
              </motion.div>
            ))}
          </div>
        )}
        {!searching && finalSearchResults.length === 0 && !showSubject && (
          <h3> Nothing to show! </h3>
        )}

    </div>
  )
}

export default SubjectsPageLoggedIn
