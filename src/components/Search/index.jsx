import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../authContext'
import { IoMdClose, IoMdSearch } from "react-icons/io"
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { IoSearch } from "react-icons/io5";

const Search = ({ handleHideSubject, handleShowSubject, handleSearch, resetSearch }) => {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState([]);
    const [showOutput, setShowOutput] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { responseToken } = useAuth();

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

  const isLargeScreen = useMediaQuery({ minWidth: 900 })

  const MotionDiv = isLargeScreen ? motion.div : 'div'

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (responseToken) {
                    const response = await axios.get(`https://memoraide-server.onrender.com/subjects/${responseToken.user_id}`);

                    if (response.status === 200) {
                        const responseData = response.data;
                        if (Array.isArray(responseData)) {
                            setResults(responseData);
                            setIsLoading(false);
                        } else {
                            console.log('Data is not an array', responseData);
                        }
                    }
                }
            } catch (err) {
                console.log('Error fetching data', err);
            }
        };

        fetchData();
    }, [responseToken]);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();

        const filteredResults = results.filter(
            (result) =>
                result.subject &&
                result.subject.toLowerCase().includes(inputText.toLowerCase())
        );

        if (filteredResults.length > 0) {
            handleHideSubject();
            handleSearch(filteredResults);
        } else {
            handleShowSubject();
            handleSearch([]);
        }

        setShowOutput(true);
    };

    const handleClearClick = () => {
        if (inputText) {
            setInputText('');
            resetSearch();
            handleShowSubject();
        }
    };

    return (
        <>
            <form className='search'>
                <input
                    className='input-field'
                    id='search-input'
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder='Search'    
                    style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}
                />

                {inputText && (
                    <button className='button' id='clear-btn' onClick={handleClearClick} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}>
                        <IoMdClose className='icon' id='cross-icon' />
                    </button>
                )}
                <MotionDiv className='button' id='search-btn' onClick={handleButtonClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> {isLargeScreen? 'Search' : <IoMdSearch className='icon' id='search-icon' />} </MotionDiv>
            </form>
        </>
    );
};

export default Search;
