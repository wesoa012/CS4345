import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { logout } from "../../api/loginApi";
import { StudentDashboard } from "../Dashboards/StudentDashboard";
import { ProfessorDashboard } from "../Dashboards/ProfessorDashboard";
import { AdminDashboard } from "../Dashboards/AdminDashboard";

export const Homepage = () => {
    // let curruser = CurrUserContext
    const [currUser, setCurrUser] = useState({...JSON.parse(localStorage.getItem("currUser"))});

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("currUser")) === undefined) {
            localStorage.setItem("currUser", "{}");
        }
    }, []);

    const navigate = useNavigate();

    return (<div className="Homepage">
        
            {localStorage.getItem("currUser") === "{}" && <div className="beforeLogin">
                <Button type="button" className="btn btn-primary rounded" onClick={() => navigate("/login")}>Login</Button>
            </div>}
            {localStorage.getItem("currUser") !== "{}" && <div className="loggedIn">
                {/* student dashboard */}
                {currUser.role_id === 1 && <StudentDashboard/>}
                {/* professor dashboard */}
                {currUser.role_id === 2 && <ProfessorDashboard/>}
                {/* admin dashboard */}
                {currUser.role_id === 3 && <AdminDashboard/>}
                <h1>Welcome {currUser.first_name}</h1>
                <Button type="button" className="btn btn-primary rounded" onClick={() => logout().then(() => {
                    localStorage.setItem("currUser", "{}");
                    navigate('/');
                })}>Logout</Button>
            </div>}

    </div >)
}