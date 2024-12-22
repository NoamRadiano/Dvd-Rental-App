import React, {useState} from 'react'

import authService from "../../../services/authService";
import useGlobalState from "../../../stores/useGlobalState";
import {Link} from "react-router-dom";

export default () => {
    const {searchName, setSearchName} = useGlobalState();
    // const setRole = useGlobalState(state => state.setRole);
    const [name, setName] = useState('');
    const [isInput, setIsInput] = useState(false);
    const onChangeMovieName = (e) => {
        setName(e.target.value);
        if(e.target.value ===''){
            setSearchName('');
            setIsInput(false);
        } else{
            setIsInput(true);
        }
    };
    const handleSearch = () =>{
        setSearchName(name);
        setIsInput(false);
    };
    const handleLogout = () =>{
        // setRole("");
        authService.logout();
    };
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-white header">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/user"><i className="fa fa-film me-3"></i> DVD Rentals</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            {/*<li className="nav-item mt-3">
                                <a className="nav-link active" href="javascript:void(0)">Link</a>
                            </li>*/}
                        </ul>
                        <form className="d-flex">
                            <input className="searchInput form-control me-1" value={name} onChange={onChangeMovieName} type="text" placeholder="Search by name"/>
                            <button className="btn btn-primary" type="button" disabled={!isInput} onClick={handleSearch}>Search</button>

                        </form>
                        <a href="#" className="navbar-brand ms-3" style={{fontSize:"xx-large"}} onClick={handleLogout} title="Sign Out"> <i className="fa fa-sign-out"/></a>
                    </div>

                </div>
            </nav>
        </>
    )
}