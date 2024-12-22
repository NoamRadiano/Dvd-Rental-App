import React, {useEffect, useState} from 'react';
import UsersHistoryTable from '../../components/TableUsersHistory';
import historyService from "../../services/historyService";
import Spinner from "../../components/Spinner";
import useGlobalState from "../../stores/useGlobalState";


const UserHistory = () => {
    const [histories, setHistories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {searchName} = useGlobalState();
    useEffect(() => {
        historyService.getAllHistories().then(response => {
            setIsLoading(false);
            if(searchName && response.data.length) response.data = response.data?.filter(history =>history. movie.title.toLowerCase().indexOf(searchName.toLowerCase()) >= 0)
            setHistories(response.data);
        }).catch(error => {
            console.error('Error fetching users', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, [searchName]);
    if(isLoading)
        return <Spinner/>;
    return (
        <div className="user user-history">
            <h1>Rental History</h1>
            <div className="container">
                <div className="row">
                <UsersHistoryTable histories={histories}/>
                </div>
            </div>
        </div>
    );
};

export default UserHistory;