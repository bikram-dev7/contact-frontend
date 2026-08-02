import React from 'react'
import { createContext, useContext, useState } from 'react'
import Loader from './Loader'

const LoaderContext = createContext()


export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
         <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}

            <Loader
                show={loading}
                fullscreen
                message="Please wait..."
            />
        </LoaderContext.Provider>
    )
}

export const useLoader = () => useContext(LoaderContext);
