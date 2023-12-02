// import React, { useState, useEffect } from 'react'
// import Search from '../Search'
// import SubjectCard from '../SubjectCard'
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { useSubject } from '../../subjectContext'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../authContext';


// const SubjectsPageLoggedIn = () => {

//   const { bgColor } = useSelector((state) => state.accessibility)

//   const navigate = useNavigate()

//   const { selectedSubjectId, setSelectedSubjectId, selectedSubjectName, setSelectedSubjectName } = useSubject()

//   const [ showSubject, setShowSubject ] = useState(true)
//   const [ finalSearchResults, SetFinalSearchResults ] = useState([])
//   const [ searching, setSearching ] = useState(false) 
//   const [ isLoading, setIsLoading ] = useState(true)
//   const [results, setResults] = useState([])

//   const { responseToken } = useAuth()

//   const handleShowSubject = () => {
//     setShowSubject(true)
//     SetFinalSearchResults([])
//     setSearching(false)
//   }

//   const handleHideSubject = () => {
//     setShowSubject(false)
//     SetFinalSearchResults([])
//     setSearching(true)
//   }

//   const handleSearch = (results) => {
//     SetFinalSearchResults(results)
//     if (searching === false) {
//       setShowSubject(false)
//     } else {
//       setShowSubject(true)
//     }
//   }

//   const resetSearch = () => {
//     setSearching(false)
//   }

//   const handleSubjectClick = (id, name) => {
//     localStorage.setItem('selectedSubjectId', id);
//     localStorage.setItem('selectedSubjectName', name);
//     setSelectedSubjectId(id);
//     setSelectedSubjectName(name);
//     navigate('/flashcards');
//   }

//   useEffect(() => {
//     if (selectedSubjectId && selectedSubjectName) {
//         localStorage.setItem('selectedSubjectId', selectedSubjectId)
//         localStorage.setItem('selectedSubjectName', selectedSubjectName)
//     }
//   }, [selectedSubjectId, selectedSubjectName]);

//   useEffect(() => {

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}`)

//             if (response.status === 200) {
//                 const responseData = response.data

//                 if (Array.isArray(responseData)) {
//                     setResults(responseData)
//                     setIsLoading(false)
//                 } else {
//                     console.log('data is not an array', responseData)
//                 }
//             }
//         } catch (err) {
//             console.log('Error fetching data', err)
//         }
//     }

//     fetchData()
// }, [])

//   return (
//     <div className='subjects-cont'>
//       <h1> Topics </h1>

//       <Search handleHideSubject={handleHideSubject} handleShowSubject={handleShowSubject} handleSearch={handleSearch} resetSearch={resetSearch} />

//         {showSubject && !searching ? (<SubjectCard handleSubjectClick={handleSubjectClick}/>) : null}

//         {(searching || finalSearchResults.length > 0) && (
//           <div className='subjectsOutput-cont'>
//             {finalSearchResults.map((result) => (
//               <motion.div key={result.id} className='subject-card' id='accessibility' style={{backgroundColor: bgColor}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleSubjectClick(result.id, result.subject)}>
//                   <p>{result.subject}</p>
//               </motion.div>
//             ))}
//           </div>
//         )}
//         {!searching && finalSearchResults.length === 0 && !showSubject && (
//           <h3> Nothing to show! </h3>
//         )}

//         {finalSearchResults.length === 0 && (
//           <h3> You don't have any topics! Use the button below to add new topics! </h3>
//         )}

//     </div>
//   )
// }

// export default SubjectsPageLoggedIn



import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Search from '../Search'
import SubjectCard from '../SubjectCard'
import { useSubject } from '../../subjectContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../authContext'
import LoadingAnimation from '../LoadingAnimation'

const SubjectsPageLoggedIn = () => {
  const { bgColor } = useSelector((state) => state.accessibility);

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
    <div className='subjects-cont'>
      <h1> Topics </h1>
      <Search handleHideSubject={handleHideSubject} handleShowSubject={handleShowSubject} handleSearch={handleSearch} resetSearch={resetSearch} />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {showSubject && !searching ? <SubjectCard handleSubjectClick={handleSubjectClick} results={results} setResults={setResults} /> : null}
          {finalSearchResults.length === 0 && !showSubject && <h3> Nothing to show! </h3>}
          {results.length === 0 && !showSubject && <h3> You don't have any topics! Use the button below to add new topics! </h3>}
        </>
      )}
    </div>
  );
};

export default SubjectsPageLoggedIn;
