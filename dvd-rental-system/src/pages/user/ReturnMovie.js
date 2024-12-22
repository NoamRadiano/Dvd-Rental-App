import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import MovieReturn from '../../components/MovieReturn';
import historyService from "../../services/historyService";
import Spinner from "../../components/Spinner";

const ReturnMovie = () => {
    const id = useParams().id;
    const [history, setHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        historyService.getHistory(id).then(response => {
            setIsLoading(false);
            setHistory(response.data);
        }).catch(error => {
            console.error('Error fetching movie details', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, [id]);

    if(isLoading)
        return <Spinner/>;
    return (
        <div>
            <MovieReturn history={history} />
        </div>
    );
};

export default ReturnMovie;