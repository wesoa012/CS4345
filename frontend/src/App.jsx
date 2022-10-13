import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CurrUserContext, CurrUserProvider } from "./Context/CurrUserContext";

import "./App.css"


//Pages to be loaded
import { Homepage } from "./Components/Homepage/Homepage";
import { Profile } from "./Components/Profile/Profile";
import { NotificationPage } from "./Components/NotificationPage/NotificationPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar/ResponsiveAppBar";


import 'bootstrap/dist/css/bootstrap.css';




export const App = () => {
    useEffect(() => {
    }, []);
    const currUserContext = useContext(CurrUserContext)
    return (<div className="app">
        <CurrUserProvider>
            <BrowserRouter>
                <ResponsiveAppBar />
                <Routes>

                    <Route path="/" element={<Homepage />} />
                    <Route path="/users/:username" element={<Profile />} />
                    <Route path="/notifications" element={<NotificationPage />} />
                    {/* <Route path="*" element={<LostPage/>}/> */}
                </Routes>
            </BrowserRouter>
        </CurrUserProvider>
    </div>
    )
}