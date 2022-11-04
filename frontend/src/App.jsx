import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css"


//Pages to be loaded
import { Homepage } from "./Components/Homepage/Homepage";
import { LoginPage } from "./Components/Login/LoginPage";
import { SignUpPage } from "./Components/Login/SignUpPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar/ResponsiveAppBar";
import { SubmittedApplications } from "./Components/StudentViews/SubmittedApplications";


// import 'bootstrap/dist/css/bootstrap.css';





export const App = () => {
    useEffect(() => {
    }, []);
    return (<div className="app">
            <BrowserRouter>
                <ResponsiveAppBar />
                <Routes>

                    <Route path="/" element={<Homepage />} />
                    {/* <Route path="/users/:username" element={<Profile />} /> */}
                    {/* <Route path="/notifications" element={<NotificationPage />} /> */}
                    <Route path="/accounts/:id/applications" element={<SubmittedApplications/>}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    {/* <Route path="*" element={<LostPage/>}/> */}
                </Routes>
            </BrowserRouter>
    </div>
    )
}