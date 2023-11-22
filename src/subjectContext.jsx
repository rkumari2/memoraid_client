import React, { createContext, useState, useContext } from 'react';

const SubjectContext = createContext();

export const useSubject = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const [selectedSubjectName, setSelectedSubjectName] = useState(null)

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
