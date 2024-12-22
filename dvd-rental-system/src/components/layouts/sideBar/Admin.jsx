import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as UserShield } from '../../icons/user-shield-solid.svg';
import { ReactComponent as PlusCircle } from '../../icons/plus-circle.svg';
import { ReactComponent as UserFriends } from '../../icons/people-fill.svg';

const SideBarAdmin = () => {
    return (
        <>
            <div className="sidebar-admin mt-5 p-4">
                <div className="d-flex justify-content-center mb-4">
                    <UserShield style={{width:"120px"}}/>
                </div>
                <div className="d-flex justify-content-center mb-5">
                    <h1> Hello Admin!</h1>
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin"><i className="fa fa-home me-3"></i> Home</Link>

                    </li>
                    <li className="nav-item">
                       <Link to="/admin/movies/add">  <PlusCircle className=" me-3" width={23} height={23}/> Add movies</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/users"><UserFriends className=" me-3" width={23} height={23}/> View Users</Link>
                    </li>
                    <li className="nav-item">
                         <Link to="/admin/orders"><i className="fa fa-list-ul me-3"></i> Order View</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/movies/edit"><i className="fa fa-pencil me-3"></i> Edit movies</Link>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default SideBarAdmin;