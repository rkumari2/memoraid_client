import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Search from '../Search'
import SubjectCard from '../SubjectCard'
import { useSubject } from '../../subjectContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../authContext'
import LoadingAnimation from '../LoadingAnimation'
import { motion } from 'framer-motion'

const SubjectsPageLoggedIn = () => {
  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const navigate = useNavigate();

  const { setSelectedSubjectId, setSelectedSubjectName } = useSubject();

  const [showSubject, setShowSubject] = useState(true);
  const [finalSearchResults, SetFinalSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const { responseToken } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}`);
        if (response.status === 200) {
          setResults(response.data);
        }
      } catch (err) {
        console.log('Error fetching data', err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [responseToken.user_id]);

  const handleSubjectClick = (id, name) => {
    localStorage.setItem('selectedSubjectId', id);
    localStorage.setItem('selectedSubjectName', name);
    setSelectedSubjectId(id);
    setSelectedSubjectName(name);
    navigate('/flashcards');
  };

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
    <div className='subjects-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
            <h1 style={{ lineHeight: lineSpacing }}>Topics</h1>
            <Search handleHideSubject={handleHideSubject} handleShowSubject={handleShowSubject} handleSearch={handleSearch} resetSearch={resetSearch} />
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <>
                    {!searching && finalSearchResults.length === 0 && !showSubject && <div className='subjectsOutput-cont'> <h3>No results found!</h3> </div>}
                    {!searching && (
                        <>
                            {/* {showSubject && results.length === 0 && <div className='subjectsOutput-cont'> <h3> You don't have any topics, use the button below to add topics.</h3> </div>} */}
                            {showSubject && <SubjectCard handleSubjectClick={handleSubjectClick} results={results} setResults={setResults} />}
                        </>
                    )}
                    {finalSearchResults.length > 0 && searching && (
                        <div className='subjectsOutput-cont'>
                            {finalSearchResults.map((result) => (
                              <motion.div
                              key={result.subjectId}
                              className='subject-card'
                              id='accessibility'
                              style={{ backgroundColor: bgColor }}
                              onClick={() => handleSubjectClick(result.subjectId, result.subject)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              >
                              <p>{result.subject}</p>
                              </motion.div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
  );
};

export default SubjectsPageLoggedIn;
