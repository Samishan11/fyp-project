import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const PropertyContext = createContext();

export const PropertyProvider = (props) => {
    const [book, setBook] = useState([]);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        axios.get(`/property`).then(function (result) {
            setBook(result.data)
            result?.data?.filter(data => {
                if (!data?.accept) {
                    setNotification(data=>[...data,data])
                    return data;
                }
            })
        })
    }, [])

    return (
        <PropertyContext.Provider value={{ value: [book, setBook], value1: [notification, setNotification] }}>
            {props.children}
        </PropertyContext.Provider>
    )
}