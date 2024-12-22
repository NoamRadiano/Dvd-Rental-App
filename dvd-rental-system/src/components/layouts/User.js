import { Navigate, Outlet } from "react-router-dom";
import SideBarUser from "./sideBar/User";

import HeaderUser from "./header/User";
import {useEffect} from "react";
import categorService from "../../services/categoryService";
import React from "react";
import authService from "../../services/authService";
import useGlobalState from "../../stores/useGlobalState";

const Layout = () => {
    let auth = null;
    const {categories, setCategories} = useGlobalState();
    useEffect(() => {
        categorService().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error('Error fetching categories', error);
        });
    }, []);
    if(!categories) return <div>loading...</div>;
    if(authService.getCurrentUser().role === 'ROLE_USER')
        auth = true;
    return (
        auth ?
        <>
            <HeaderUser/>
            <div className="row">
                <div className="col-sm-3 bg-color-1">
                    <SideBarUser categories={categories}/>
                </div>
                <div className="col-sm-9">
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/*<div class="mt-5 p-4 bg-dark text-white text-center">
                <p>Footer</p>
            </div>*/}
        </>
        :
    <Navigate to="/login"/>
    )
};

export default Layout;