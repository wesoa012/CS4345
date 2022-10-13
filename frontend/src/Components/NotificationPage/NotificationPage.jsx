import React from "react";
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";

import { CurrUserContext } from '../../Context/CurrUserContext';

import { NotificationBanner } from './NotificationBanner';

export const NotificationPage = () => {
    const navigate = useNavigate()
    const currUser = useContext(CurrUserContext);
    const [ currNotification, setCurrNotification ] = useState(undefined);

    useEffect(() => {
        //NEED TO RESEARCH HOW NOTIFICATIONS ARE UPDATED
        // if(currUser.notifications === [])
        // {
        //     //api call?
        // }
        setCurrNotification(currUser.currNotification);
    }, []);

    return (
        <div className="NotificationPage d-flex align-items-stretch flex-column">
            <div className="row height-100">
                <div className="message-list col-3">
                    {currUser.notifications.map((notification) => {

                        let selected = "";
                        if (currNotification && currNotification.id === notification.id) {
                            selected = "bg-primary"
                        }

                        return (<div>
                            <NotificationBanner
                                
                                notification={notification}
                                selected={selected}
                                currNotification={currNotification}
                                setCurrNotification={x => setCurrNotification(x)}
                            />
                        </div>);
                    })}
                </div>
                <div className="message-view col-9">
                    {currNotification === undefined && <div className="h2 text-secondary">
                        <div className="flex-row justify-content-center" >
                            <div className="flex-column justify-content-center align-items-stretch" onClick={() => navigate('/')}>
                                No Message Selected
                            </div>
                        </div>
                    </div>
                    }
                    {currNotification && <table className="m1-3 p-0 position-relative table">
                        <thead>
                            <div className='p-2 border-bottom border-top'>
                                <tr className="col-12 border-0">
                                    <th className="p-0 border-0 h2">
                                        {currNotification.header}
                                    </th>
                                </tr>
                            </div>
                        </thead>
                        <tbody>
                            <div className="p-2">
                                <tr className='border-0'>
                                    <td className="overflow-auto p-0 border-0">
                                        {currNotification.message}
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>}


                </div>
            </div>
        </div>
    );
}