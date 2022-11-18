import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export const ProfessorDashboard = () => {
    const [currUser, setCurrUser] = useState({...JSON.parse(localStorage.getItem("currUser"))});

    useEffect(() => {}, []);

    const navigate = useNavigate();

    return (<div className="Dashboard text-center">
            <Button variant="contained" className="btn btn-primary" onClick={() => {navigate(`/addCourse`)}}>Add Course</Button>
            <br/>
            <br/>
            <Button variant="contained" className="btn btn-primary" onClick={() => {navigate("/accounts/:id/courses")}}>View My Courses</Button>
        
    </div >)
}