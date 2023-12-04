import React, { createContext, useState, useContext, useEffect } from 'react';

const SubjectContext = createContext();

export const useSubject = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
    
    const storedSubjectId = localStorage.getItem('selectedSubjectId');
    const storedSubjectName = localStorage.getItem('selectedSubjectName');

    const [selectedSubjectId, setSelectedSubjectId] = useState(storedSubjectId || null);
    const [selectedSubjectName, setSelectedSubjectName] = useState(storedSubjectName || null);

    useEffect(() => {
        if (selectedSubjectId !== storedSubjectId) {
            setSelectedSubjectId(storedSubjectId);
        }
        if (selectedSubjectName !== storedSubjectName) {
            setSelectedSubjectName(storedSubjectName);
        }
    }, [selectedSubjectId, storedSubjectId, selectedSubjectName, storedSubjectName]);

    const value = {
        selectedSubjectId,
        setSelectedSubjectId,
        selectedSubjectName,
        setSelectedSubjectName
    };

    return (
        <SubjectContext.Provider value={value}>
            {children}
        </SubjectContext.Provider>
    );
};

