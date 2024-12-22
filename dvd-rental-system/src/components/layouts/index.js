import { Outlet, Link } from "react-router-dom";
import SideBarAdmin from "./sideBar/Admin";
import SideBarUser from "./sideBar/User";

import HeaderAdmin from "./header/Admin";
import HeaderUser from "./header/User";

const Layout = () => {
    return (
        <>
            <HeaderUser/>
            <div className="row">
                <div className="col-sm-3 bg-color-1">
                    <SideBarUser/>
                    {/*<SideBarAdmin/>*/}
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
    )
};

export default Layout;