import { useState, createContext, useEffect } from 'react';
import { parseJwt } from '../utils/parseJWT';

export const RoomContext = createContext();

export const RoomProvider = (props) => {
    const [roomData, setRoomData] = useState({});

    return (
        <RoomContext.Provider value={[roomData, setRoomData]}>
            {props.children}
        </RoomContext.Provider>
    )
}