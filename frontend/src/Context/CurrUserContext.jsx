import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useMemo } from "react";

export const CurrUserContext = createContext(null);

//Will be funded by api calls

const defaultNotifications = [{ id: 1, header: "Message 1", message: "text goes in here" },
{ id: 2, header: "Class Signup Ending", message: "lol" },
{ id: 3, header: "PP", message: "Poo Poo" }];

export const CurrUserProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState({});
    

    const [currNotification, setCurrNotification] = useState(undefined);
    const [notifications, setNotifications] = useState(defaultNotifications);

    const openNotification = (notification) => {
        
        setCurrNotification(notification);
        console.log("New currUser currNotif", currNotification)
        // console.log(notification);
    }

    const deleteNotification = () => {
        // delete api call

        console.log(notifications.length)
        let _notifications = [];
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i] !== currNotification) {
                _notifications.push(notifications[i])
            }
        }
        setNotifications(_notifications);
        setCurrNotification(undefined);
    }
    const context = {
        currUser,
        setCurrUser,
        currNotification,
        setCurrNotification,
        notifications,
        setNotifications,
        openNotification,
        deleteNotification
    };

    useEffect(() => {
        console.log("Curr User Rendering")
        // setNotifications(defaultNotifications);
    }, []);


    return <CurrUserContext.Provider value={context}>
        {children}
    </CurrUserContext.Provider>
}