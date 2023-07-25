import { useState, createContext } from 'react';

export const BookRoomContext = createContext();

export const RoomBookProvider = (props) => {
    const [room, setRoom] = useState();

    return (
        <BookRoomContext.Provider value={[room, setRoom]}>
            {props.children}
        </BookRoomContext.Provider>
    )
}