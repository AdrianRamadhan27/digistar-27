import React, { createContext, useState } from 'react';

const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
    const [data, setData] = useState([
        "KC Jakarta Selatan",
        "KC Jakarta Utara",
        "KC Jakarta Barat",
        "KC Jakarta Timur",
        "KC Jakarta Pusat"
    ]);   


    const addToList = (newItem) => {
        setData((prevData) => [...prevData, newItem]);
    };
    
    const deleteFromList = (index) => {
        setData((prevData) => [...prevData.slice(0, index), ...prevData.slice(index + 1)]);
    };

    return (
        <DepartmentContext.Provider value={{ data, addToList, deleteFromList }}>
            {children}
        </DepartmentContext.Provider>
    );
};

export { DepartmentContext, DepartmentProvider };