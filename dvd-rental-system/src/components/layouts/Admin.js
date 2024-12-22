import { Outlet, Navigate } from "react-router-dom";
import SideBarAdmin from "./sideBar/Admin";

import HeaderAdmin from "./header/Admin";
import authService from '../../services/authService';


const LayoutAdmin = () => {
    let auth = null;
    if(authService.getCurrentUser().role === 'ROLE_ADMIN')
        auth = true;
    return (
        auth ?
        <>
            <HeaderAdmin/>
            <div className="row">
                <div className="col-sm-3 bg-color-1">
                    <SideBarAdmin/>
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
        </> :
            <Navigate to="/login"/>
    )
};

export default LayoutAdmin;