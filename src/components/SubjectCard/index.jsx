import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RiDeleteBin6Fill } from "react-icons/ri"
import AddSubjectBtn from '../AddSubjectBtn';
import { IoMdClose } from "react-icons/io"

const SubjectCard = ({ handleSubjectClick, results, setResults, showDeleteConfirmationOverlay, handleDeleteSubject, showDeleteConfirmation, setShowDeleteConfirmation }) => {

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const handleHideOverlay = () => {
    setShowDeleteConfirmation(false)
  }

  return (
    <div className='subjectsOutput-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
      {results.length === 0 ? (
        <h3>You don't have any topics. Use the button below to add new topics. </h3>
      ) : (
        results.map((item) => (
          <motion.div
            key={item.id}
            className='subject-card'
            id='accessibility'
            style={{ backgroundColor: bgColor }}
            onClick={() => handleSubjectClick(item.id, item.subject)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <p>{item.subject}</p>

            <motion.button className='button' id='delete-btn' onClick={(e) => {
              e.stopPropagation();
              showDeleteConfirmationOverlay(item.id);
            }}
            initial={{opacity: 0.5}} whileHover={{opacity:1, scale:1.1}}>
              <RiDeleteBin6Fill className='icon' id='delete-icon'/>
            </motion.button>
          </motion.div>
        ))
      )}
      <AddSubjectBtn results={results} setResults={setResults}/>

      {showDeleteConfirmation && (
        <div className='overlay-bg' style={{ display: showDeleteConfirmation ? 'flex' : 'none', fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>

        {showDeleteConfirmation && (
          <div className='overlay'>

            <div id='cancel-sect'>
              <button className='button' id='cancel-btn' onClick={handleHideOverlay}> <IoMdClose className='icon' /> </button>
            </div>

            <p className='delete-text'> Are you sure you want to delete this topic and related flashcards? </p>

            <div className='search' id='column-search'>
              <motion.button className='button' id='add-btn' onClick={handleDeleteSubject} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Delete </motion.button>
            </div>

          </div>)}

        </div>
      )}

    </div>
  );
};

export default SubjectCard;
