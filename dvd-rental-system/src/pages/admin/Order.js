import React, {useEffect, useState} from 'react';
import historyService from "../../services/historyService";
import AdminHistoryTable from "../../components/AdminHistoryTable";

const OrderPage = () => {
    const [histories, setHistories] = useState(null);
    useEffect(() => {
        historyService.getAllHistories().then(response => {
            setHistories(response.data);
        }).catch(error => {
            console.error('Error fetching users', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, []);
    return (
        <div className="admin order">
            <h1>Orders View <i className="fa fa-home"></i></h1>
            <div className="row">
                <AdminHistoryTable histories={histories}/>
            </div>
        </div>
    );
};

export default OrderPage;
