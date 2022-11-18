import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export const AdminDashboard = () => {
    const [currUser, setCurrUser] = useState({...JSON.parse(localStorage.getItem("currUser"))});

    useEffect(() => {}, []);

    const navigate = useNavigate();

    return (<div className="Dashboard text-center">
            <Button variant="contained" className="btn btn-primary" onClick={() => {navigate(`/accounts`)}}>Search People</Button>
    </div >)
}