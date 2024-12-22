import React, { useState } from 'react';
import {Link} from "react-router-dom";
import authService from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(true);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeAge = (age) => {
        setAge(age);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        authService.register(username, password, email, age).then((res) => {
            if(res.status == 200){
                if(res.data === "nameIsExisted"){
                    alert("User name is existed.\nPlease input again user name.");
                }
                else if(res.data === "emailIsExisted"){
                    alert("Same Email is existed.\nPlease input again email.");
                }
                else {
                    window.location.assign('/login');
                    alert("successfully sign up!");
                }
            }
            else{
                alert("Sorry but Failed sign up.\n please try again!");
            }
        }).catch(error => {
            console.error('Registration failed', error);
        });
    };

    return (
        <>
            <form onSubmit={handleRegister} className="was-validated ">
                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Username:</label>
                    <input type="text" className="form-control custom-input" id="name" placeholder="Enter username" name="name"
                           value={username}
                           onChange={onChangeUsername}
                           required/>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out user name.</div>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control custom-input" id="email" placeholder="Enter email" name="email"
                           value={email}
                           onChange={onChangeEmail}
                           required/>
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out email.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control custom-input" id="pwd" placeholder="Enter password" name="pwd"
                           minLength={6}
                           value={password}
                           onChange={onChangePassword}
                           required/>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out password.</div>
                </div>
                <div className="mb-3">
                    <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Age: </label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="age" id="age+"
                               value={true}
                               checked={age===true}
                               onChange={()=>onChangeAge(true)}
                        />
                        <label className="form-check-label" htmlFor="age+">18+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="age" id="age-"
                               value={false}
                               checked={age===false}
                               onChange={()=>onChangeAge(false)}
                        />
                        <label className="form-check-label" htmlFor="age-">Under 18</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-100 btn-lg">Sign in</button>
                <div className="mt-3 text-sm-center">
                    <label className="form-label">Already have an account? <Link to="/login">Login</Link></label>
                </div>

            </form>
        </>
    );
};

export default Register