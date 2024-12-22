import React from 'react'
import authService from "../../../services/authService";
import useGlobalState from "../../../stores/useGlobalState";
import {Link} from "react-router-dom";

export default () => {
    const setRole = useGlobalState(state => state.setRole);
    const handleLogout = () =>{
        setRole("");
        authService.logout();
    };
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-white header">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin"><i className="fa fa-film me-3"></i> DVD Rentals</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <a href="#" className="navbar-brand ms-3" style={{fontSize:"xx-large"}} onClick={handleLogout} title="Sign Out."> <i className="fa fa-sign-out"/></a>
            </nav>
        </>
    )
}