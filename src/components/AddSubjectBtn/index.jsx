import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../authContext'
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const AddSubjectBtn = ({ setResults, results }) => {
  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

    const [showAddOverlay, setShowAddOverlay] = useState(false)
    const [subject, setSubject] = useState('')

    const { responseToken } = useAuth()

    const handleShowOverlay = () => {
        setShowAddOverlay(true)
    }

    const handleHideOverlay = () => {
        setShowAddOverlay(false)
        setSubject('')
    }

    const handleAddNew = async () => {
        if (subject.trim() === '') {
            alert('Subject cannot be empty');
            return;
        }

        try {
            const response = await axios.post(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}/new`, {
                subject: subject
            })
            if (response.status === 201) {
                const newSubject = {
                    subject: subject,
                    id: response.data.id,
                    user_id: responseToken.user_id
                }

                if (newSubject && Object.keys(newSubject).length > 0) {
                    setResults((prevResults) => [newSubject, ...prevResults])
                    handleHideOverlay()
                } else {
                    console.error('Invalid new subject data in the API response.')
                }
            }
        } catch (err) {
            console.error('Error adding new subject:', err)
        }
    }


    return (
        <>
            <motion.button className='button' id='add-subject-btn' onClick={handleShowOverlay} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> <IoMdAdd className='icon' id='plus-icon'/> </motion.button>

            <div className='overlay-bg' style={{ display: showAddOverlay ? 'flex' : 'none', fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>

                {showAddOverlay && (
                    <div className='overlay'>
                        <div id='cancel-sect'>
                            <button className='button' id='cancel-btn' onClick={handleHideOverlay}> <IoMdClose className='icon' /> </button>
                        </div>
                        <h2> ADD A NEW TOPIC </h2>
                        <div className='search' id='column-search'>
                            <input
                                className='input-field'
                                id='subject-input'
                                type="text"
                                placeholder='Subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}
                            />
                            <motion.button className='button' id='add-btn' onClick={handleAddNew} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Add </motion.button>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default AddSubjectBtn
