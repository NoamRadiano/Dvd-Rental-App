import React, { useState } from 'react';
import authService from '../services/authService';
import useGlobalState from "../stores/useGlobalState";
import {Link} from "react-router-dom";
const ROLES={
    ADMIN :"ROLE_ADMIN",
    USER: "ROLE_USER"
};
const Login = () => {
    const {role, setRole} = useGlobalState();
    const {token, setToken} = useGlobalState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
/*    const [role, setRole] = useState(ROLES.USER);*/

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeRole = (e) => {
        setRole(e.target.value);
    };

    const handleLogin = (e) => {

        e.preventDefault();
        authService.login(username, password, role).then((res) => {
            setToken(res.token);
            setRole(res.role);
            let nextURL = "";
            if(res.role == ROLES.USER)
               nextURL = "/user";
            else
                nextURL = "/admin";
           window.location.assign(nextURL);
        }).catch(error => {
            setMessage('Invalid username or password');
            console.error('Login failed', error.message);
        });
    };

    return (
        <>
            <form onSubmit={handleLogin} className="was-validated ">
                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Username:</label>
                    <input type="text" className="form-control custom-input" id="name" placeholder="Enter username" name="name"
                           required
                           value={username}
                           onChange={onChangeUsername}
                    />
                    {/*<div className="valid-feedback">Valid.</div>*/}
                    <div className="invalid-feedback">Please fill out user name.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control custom-input" id="pwd" placeholder="Enter password" name="pwd"
                           required
                           value={password}
                           onChange={onChangePassword}
                    />
                    {/*<div className="valid-feedback">Valid.</div>*/}
                    <div className="invalid-feedback">Please fill out password.</div>
                </div>
               {/* <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Role:</label>
                    <Form.Select value={role} onChange={onChangeRole}>
                        <option value={ROLES.ADMIN}>Admin</option>
                        <option value={ROLES.USER}>User</option>
                    </Form.Select>
                </div>*/}

                <button type="submit" className="btn btn-success w-100 btn-lg">Log in</button>

                {message && <div className="mt-3 text-sm-center color-1">{message}</div>}
                <div className="mt-3 text-sm-center">
                    <Link to="/register" style={{color:"#67c2ad", textDecoration: "none"}}>Create new account</Link>
                </div>

            </form>
        </>
    );
};

export default Login;
