// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Method Imports
import { getAccountbyId, registerAccount, fetchSchools } from "../../api/loginApi";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Button from '@mui/material/Button';

export const SignUpPage = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [smu_id, setSmu_id] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
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

    }, []);

    // Conditions

    // Component Methods
    const clickAddAccount = () => {
        if (smu_id && password && firstName && lastName && email) {
            let temp = {
                "smu_id": smu_id,
                "password": password,
                "first_name": firstName,
                "last_name": lastName,
                "email": email
            };
            registerAccount(temp)
                .then(res => {
                    if (res.status !== 201) {
                        window.alert(`Failed to Sign Up. ${res.error}`);
                    }
                    else {
                        navigate('/login');
                    }
                })
        }
        else if (!smu_id || !password || !firstName || !lastName || !email) {
            window.alert("Please fill out all fields");
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
        <h1 className="text-center">Sign Up</h1>
        <div className="text-center">
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
                    <InputLabel htmlFor="outlined-adornment-password">First Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        label="First Name"
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        label="Last Name"
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        label="Email"
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
                <br/>
                <br/>
                <Button
                    type="button"
                    onClick={() => clickAddAccount()}
                    variant="contained"
                    className="btn btn-success text-light">
                    Sign Up
                </Button>
            </form>
        </div>

        <br/>
        <br/>

        <div className="text-center">
            <p className="fs-3" >Already Have an account?</p>
            <Button
                type="button"
                onClick={() => navigate('/login')}
                variant="contained"
                className="btn btn-secondary text-light">
                Login
            </Button>
        </div>
    </section>
}