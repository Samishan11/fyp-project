import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { parseJwt } from '../utils/parseJWT';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const parseToken = parseJwt(token);
        axios.post(`/profile/${parseToken?.userId}`).then(function (result) {
            setUser(result.data.profile)
            console.log(parseToken.userId);
        })
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}