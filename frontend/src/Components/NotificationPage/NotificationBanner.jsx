import React from "react";
import { useEffect, useState, useContext } from "react"
import { CurrUserContext } from "../../Context/CurrUserContext";

export const NotificationBanner = (props) => {
    const currUser = useContext(CurrUserContext);

    useEffect(() => {
        //NEED TO RESEARCH HOW NOTIFICATIONS ARE UPDATED
        // if(currUser.notifications === [])
        // {
        //     //api call?
        // }

    }, []);

    return (
        <div className={`NotificationBanner ${props.selected}`} onClick={() => props.setCurrNotification(props.notification)}>
            <table>
                <thead>
                    <tr>
                        <th>
                            {props.notification.header.length > 20 && <div className="messagehead">{props.notification.header.substring(0,49)}...</div>}
                            {props.notification.header.length < 20 && <div className="messagehead">{props.notification.header}</div>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {props.notification.message.length > 50 && <div className="messagebody">{props.notification.message.substring(0,49)}...</div>}
                            {props.notification.message.length < 50 && <div className="messagebody">{props.notification.message}</div>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}