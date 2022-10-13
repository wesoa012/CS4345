// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports

// Method Imports
import { logIntoAccount } from "../../api/loginApi";
// import { reconnectWS } from "../../client-websocket";


import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

export const LoginPage = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [smu_id, setSmu_id] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Initial Load
    useEffect(() => {
        if (localStorage.getItem("currUser") === null) {
            localStorage.setItem("currUser", "{}");
        }
        if (localStorage.getItem("currUser") !== "{}") {
            console.log("User exists");
            navigate('/');
        }
    });

    // Conditions

    // Component Methods
    const login = () => {
        let credentials = {
            "username": username,
            "password": password
        };
        logIntoAccount(credentials).then(res => checkIfLoginSucc(res)).catch();
    }
    const checkIfLoginSucc = (res) => {
        if (res.success !== 1) {
            window.alert("Password or username is incorrect");
        }
        else {
            console.log("logging in now...");
            getAccountbyId(res.account_id)
                .then(x => {
                    reconnectWS();

                    localStorage.setItem("currUser", JSON.stringify(x));
                    props.setNavigated(0);
                    navigate('/');
                });
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // HTML
    return <section id="loginView">
        <h1 class="text-success">Login</h1>
        <form className="container">
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">SMU ID</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type='text'
                    value={smu_id}
                    onChange={event => setSmu_id(event.target.value)}
                    label="SMU ID"
                />
            </FormControl>


            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>


            <Button
                type="button"
                onClick={() => login()}
                className="btn btn-primary">
                Login
            </Button>
            {/* <GenericButton label="Login" click="/loggedIn" /> */}
            <p className="mb-0">or</p>
            <Button label="Sign Up" onClick={() => navigate("/signup")} className="btn btn-primary" >Signup</Button>
        </form>
    </section>
}