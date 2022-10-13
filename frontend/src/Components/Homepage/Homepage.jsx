import React from "react";
import { useEffect, useState } from "react"


import { Login } from "../Login/Login";



export const Homepage = () => {
    const [tryingToLogin, setTryingToLogin] = useState(false);
    // const [viewingNotification, setViewingNotification] = useState(false);
    

    useEffect(() => {

    }, []);

    return (<div className="Homepage">

        {<div>
            {tryingToLogin === true &&
                <Login setTryingToLogin={x => setTryingToLogin(x)} />}
            <button type="button" className="btn btn-primary rounded" onClick={() => setTryingToLogin(true)}>Login</button>

            {/* Notifications */}
            

        </div>}

    </div >)
}