import React, { useState } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const EditFlashcardBtn = ({ flashcardId, fetchData }) => {
  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility);

  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');

  const handleShowOverlay = () => {
    setShowEditOverlay(true);
  };

  const handleHideOverlay = () => {
    setShowEditOverlay(false);
    setEditedQuestion('');
    setEditedAnswer('');
  };

  const handleEditFlashcard = async () => {

    try {
      const response = await axios.patch(`https://memoraide-server.onrender.com/flashcards/cards/${flashcardId}`, {
        question: editedQuestion,
        answer: editedAnswer
      });

      if (response.status === 200) {
        handleHideOverlay();
        fetchData();
      }

    } catch (err) {
      console.error('Error editing flashcard:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
      }
    }
  };

  return (
    <>
      <motion.button
        className='button'
        id='edit-flashcard-btn'
        onClick={handleShowOverlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Edit
      </motion.button>

      <div className='overlay-bg' style={{ display: showEditOverlay ? 'flex' : 'none', fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}>
        {showEditOverlay && (
          <div className='overlay'>
            <div id='cancel-sect'>
              <button className='button' id='cancel-btn' onClick={handleHideOverlay}> <IoMdClose className='icon' /> </button>
            </div>
            <h2> EDIT FLASHCARD </h2>
            <div className='search' id='column-search' >
              <input
                className='input-field'
                type="text"
                placeholder='Edited Question'
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}
              />
              <input
                className='input-field'
                type="text"
                placeholder='Edited Answer'
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}
              />
              <motion.button
                className='button'
                id='edit-btn'
                onClick={handleEditFlashcard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                style={{ fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing }}
              >
                Save
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditFlashcardBtn;
