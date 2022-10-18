import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { logout } from "../../api/loginApi";
import { CurrUserContext } from "../../Context/CurrUserContext";

export const Homepage = () => {
    // let curruser = CurrUserContext

    useEffect(() => {
        if (localStorage.getItem("currUser") === undefined) {
            localStorage.setItem("currUser", "{}");
        }
    }, []);

    const navigate = useNavigate();

    return (<div className="Homepage">
        
            {localStorage.getItem("currUser") === "{}" && <div className="beforeLogin">
                <Button type="button" className="btn btn-primary rounded" onClick={() => navigate("/login")}>Login</Button>
            </div>}
            {localStorage.getItem("currUser") !== "{}" && <div className="loggedIn">
                <Button type="button" className="btn btn-primary rounded" onClick={() => logout().then(() => {
                    localStorage.setItem("currUser", "{}");
                    navigate('/');
                })}>Logout</Button>
            </div>}

    </div >)
}