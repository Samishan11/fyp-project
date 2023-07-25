import { useState, createContext, useEffect } from 'react';

export const CompareContext = createContext();

export const CompareProvider = (props) => {
    const [compare, setCompare] = useState({});
    return (
        <CompareContext.Provider value={[compare, setCompare]}>
            {props.children}
        </CompareContext.Provider>
    )
}