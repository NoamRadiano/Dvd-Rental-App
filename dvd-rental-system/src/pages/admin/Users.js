import React, {useEffect, useState} from 'react';
import { ReactComponent as UserFriends } from '../../components/icons/people-fill.svg';
import TableUsers from '../../components/TableUsers';
import userService from "../../services/userService";
import Spinner from "../../components/Spinner";


const UserPage = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        userService.getUsers().then(response => {
            setIsLoading(false);
            setUsers(response.data);
        }).catch(error => {
            console.error('Error fetching users', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, []);
    if(isLoading)
        return <Spinner/>;
    return (
        <div className="admin user">
            <h1>Users <UserFriends className="ms-2" width={35} height={35}/> </h1>
            <div className="container">
                <div className="row">
                <TableUsers users={users}/>
                </div>
            </div>
        </div>
    );
};

export default UserPage;