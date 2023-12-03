import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import AddSubjectBtn from '../AddSubjectBtn';

const SubjectCard = ({ handleSubjectClick, results, setResults }) => {
  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

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
          </motion.div>
        ))
      )}
      <AddSubjectBtn results={results} setResults={setResults}/>
    </div>
  );
};

export default SubjectCard;
