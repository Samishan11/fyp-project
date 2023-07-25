import axios from 'axios';
import React from 'react'
export const PropertyContext = React.createContext();

export const ProprtyProvider = (props) => {
    const [property, setProperty] = React.useState([])
    const [isloading, setIsloading] = React.useState(true)

    React.useEffect(() => {
        const getProperty = async () => {
            try {
                const res = await axios.get('/property');
                if (res.data === 'data') {
                    setProperty(res)
                    setIsloading(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProperty()
    }, [])

    return (
        <PropertyContext.Provider value={{ property_value: [property, setProperty], loading_value: [isloading, setIsloading] }}>
            {props.children}
        </ PropertyContext.Provider>
    )

}