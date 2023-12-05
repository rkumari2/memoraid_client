import React, { useState } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const EditFlashcardBtn = ({ flashcardId, fetchData, handleShowEditOverlay, setEditedQuestion, setEditedAnswer, handleHideEditOverlay, handleEditFlashcard }) => {

  

  return (
    <>
      <motion.button
        className='button'
        id='edit-flashcard-btn'
        onClick={() => handleShowEditOverlay(flashcardId)}
        initial={{opacity: 0.5}}
        whileHover={{ scale: 1.1, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RiEdit2Fill className='icon'/>
      </motion.button>
    </>
  );
};

export default EditFlashcardBtn;
