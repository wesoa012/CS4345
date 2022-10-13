import React from "react";
import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export const Login = ({ setTryingToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    }

    return <div className="Login">
        <div className="OverShield"></div>
        <div className="LoginBox rounded">
            <button type="button" className="btn btn-primary" onClick={() => setTryingToLogin(false)}>Close</button>
            <input type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="slightly-rounded text"
                value={username}
                onChange={event => setUsername(event.target.value)} />
            {passwordShow === false && <div className="col-12">
                <div className="p-1 float-left">
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="slightly-rounded text col-12"
                        value={password}
                        onChange={event => setPassword(event.target.value)} />

                        
                </div>
                <div className=" col-12">
                    <div className="float-right">
                        <VisibilityIcon className="" onClick={() => togglePassword()} />
                    </div>
                </div>
            </div>}

            {passwordShow === true && <div className="col-12 float-right">
                <div className="col-12">
                    <input type="text"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="slightly-rounded text position-relative col-12"
                        value={password}
                        onChange={event => setPassword(event.target.value)} />
                </div>

                <div className="float-right col-1">
                    <VisibilityOffIcon onClick={() => togglePassword()} />
                </div>
            </div>}
            <button type="button" className="rounded btn btn-primary" onClick={() => setTryingToLogin(false)}>Confirm</button>
            {/* <button type="button" onClick={() => setTryingToLogin(false)}>Confirm</button> */}
        </div>
    </div>
}