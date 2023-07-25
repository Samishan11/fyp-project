import { useState, createContext, useEffect } from 'react';

export const ListingContext = createContext();

export const ListingProvider = (props) => {
    const [listingData, setListingData] = useState({});

    return (
        <ListingContext.Provider value={[listingData, setListingData]}>
            {props.children}
        </ListingContext.Provider>
    )
}