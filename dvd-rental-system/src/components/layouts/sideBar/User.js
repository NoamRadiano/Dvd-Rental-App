import { Link } from "react-router-dom";

import React from "react";

const SideBarUser = (props) => {
    return (
        <>
            <div className="sidebar-user mt-5 p-4">
                <div className=" mb-2">
                    <h1> Browse DVDs</h1>
                </div>
                <ul className="nav flex-column  ms-4 mb-5">
                    <li className="nav-item">
                        <Link to="/user/movies/sort/rated">Top rated</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/movies/sort/new_released">New Release</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/movies/sort/recommended">Recommended</Link>
                    </li>

                </ul>
                <div className=" mb-2">
                    <h1>Categories</h1>
                </div>
                <ul className="nav flex-column ms-4 mb-5">
                    {props.categories.map((item) =>
                    <li className="nav-item" key={item.id}>
                        <Link to={`/user/movies/category/${item.name}`}>{item.name}</Link>
                    </li>
                        )}

                </ul><div className=" mb-5">
                <h1><Link to="/user/history"><i className="fa fa-clock-o me-3"></i> Rental History</Link></h1>
            </div>

            </div>

        </>
    )
};

export default SideBarUser;