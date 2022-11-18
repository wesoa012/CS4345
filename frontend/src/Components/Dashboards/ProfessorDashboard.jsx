import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export const ProfessorDashboard = () => {
    const [currUser, setCurrUser] = useState({...JSON.parse(localStorage.getItem("currUser"))});

    useEffect(() => {}, []);

    const navigate = useNavigate();

    return (<div className="Dashboard">
            <Button className="btn btn-primary" onClick={() => {navigate(`/addCourse`)}}>Add Course</Button>
            <Button className="btn btn-primary" onClick={() => {navigate(`/accounts/${currUser.smu_id}/courses`)}}>View My Courses</Button>
    </div >)
}