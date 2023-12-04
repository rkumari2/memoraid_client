import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import AddSubjectBtn from '../AddSubjectBtn';

const SubjectCard = ({ handleSubjectClick, results, setResults, showDeleteConfirmationOverlay, handleDeleteSubject, showDeleteConfirmation, setShowDeleteConfirmation }) => {
  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  return (
    <div className='subjectsOutput-cont' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
      {results.length === 0 ? (
        <h3>You don't have any topics. Use the button below to add new topics. </h3>
      ) : (
        results.map((item) => (
          <div
            key={item.id}
            className='subject-card'
            id='accessibility'
            style={{ backgroundColor: bgColor }}
            onClick={() => handleSubjectClick(item.id, item.subject)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <p>{item.subject}</p>

            <button className='button' id='delete-btn' onClick={(e) => {
              e.stopPropagation();
              showDeleteConfirmationOverlay(item.id);
            }}>
              Delete
            </button>
          </div>
        ))
      )}
      <AddSubjectBtn results={results} setResults={setResults}/>

      {showDeleteConfirmation && (
        <div className='overlay-bg'>
          <div className='overlay'>
            <p>Are you sure you want to delete this flashcard?</p>
            <button className='button' onClick={handleDeleteSubject}>
              Delete
            </button>
            <button className='button' onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SubjectCard;
