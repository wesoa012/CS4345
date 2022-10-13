import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const CurrUserContext = createContext(null);

export const CurrUserProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState({});
    

    
    const context = {
        currUser,
        setCurrUser,
    };

    useEffect(() => {
        console.log("Curr User Rendering")
        // setNotifications(defaultNotifications);
    }, []);


    return <CurrUserContext.Provider value={context}>
        {children}
    </CurrUserContext.Provider>
}