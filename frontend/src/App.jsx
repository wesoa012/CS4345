import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css"
import { AccountSearch } from "./Components/AccountSearch/AccountSearch";


//Pages to be loaded
import { Homepage } from "./Components/Homepage/Homepage";
import { LoginPage } from "./Components/Login/LoginPage";
import { SignUpPage } from "./Components/Login/SignUpPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar/ResponsiveAppBar";
import { CourseList } from "./Components/Courses/CourseList";
import { SubmittedApplications } from "./Components/StudentViews/SubmittedApplications";
import { AddCourse } from './Components/Courses/AddCourse';


import 'bootstrap/dist/css/bootstrap.css';





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
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/accounts" element={<AccountSearch />} />
                    {/* <Route path="*" element={<LostPage/>}/> */}
                    <Route path="/courses" element={<CourseList />}/>
                    <Route path='/addCourse' element={<AddCourse/>}/>

                    {/* Account specific stuffs */}
                    <Route path="/accounts/:id" element={<Profile />} />
                    <Route path="/accounts/:id/applications" element={<SubmittedApplications/>}/>
                    <Route path='/accounts/:id/courses' element={<ProfessorCourses />} />
                </Routes>
            </BrowserRouter>
    </div>
    )
}