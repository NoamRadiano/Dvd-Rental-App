import React, {useEffect, useState} from 'react';
import { ReactComponent as ShieldCheck} from "../../components/icons/shield-fill-check.svg";
import StnImg from './img/snt.png';
import movieService from "../../services/movieService";
import authService from "../../services/authService";
import userService from "../../services/userService";
import historyService from "../../services/historyService";
import useGlobalState from "../../stores/useGlobalState";
const HomePage = () => {
    const {role, token} = useGlobalState();
    const [userCount, setUserCount] = useState(0);
    const [availableCount, setAvailableCount] = useState(0);
    const [returnedMovieCount, setReturnedMovieCount] = useState(0);
    const [totalReturnedMovieCount, setTotalReturnedMovieCount] = useState(0);

    useEffect(() => {
        userService.getUsers().then(response =>{
            setUserCount(response.data.length);
        }).catch(error => {
            console.error('Error fetching movie details', error);
        });
        movieService.getAllMovies().then(response => {
            if(response.data){
                let count = 0;
                response.data.forEach(movie=>{
                    count += Number(movie.quantity)
                });
                setAvailableCount(count);
            }

        }).catch(error => {
            console.error('Error fetching movie details', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
        historyService.getAllHistories().then(response => {
            if(response.data){
                var count = 0;
                response.data.forEach(history=>{
                    if(!history.dateReturned) count++;
                });
                setReturnedMovieCount(count);
                setTotalReturnedMovieCount(response.data.length);
            }
        }).catch(error => {
            console.error('Error fetching movie details', error);
        });
    }, []);
    return (
        <div className="admin home">
            <h1>{role + token} Hello Boss! <ShieldCheck style={{color:"limegreen"}} width={45} height={45} /></h1>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card bg-dark color-1">
                            <div className="card-header">AMOUNT OF USERS</div>
                            <div className="card-body">{userCount}</div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card bg-color-1 text-dark">
                            <div className="card-header">AVAILABLE MOVIES</div>
                            <div className="card-body">{availableCount}</div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card bg-dark color-1">
                            <div className="card-header">CURRENT RENTED MOVIES</div>
                            <div className="card-body"> {returnedMovieCount}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card bg-color-1 text-dark">
                            <div className="card-header">TOTAL RENTED MOVIES</div>
                            <div className="card-body">{totalReturnedMovieCount}</div>
                        </div>
                    </div>
                    <div className="col-sm-12 mt-5">
                        <img src={StnImg} className="rounded" style={{maxWidth:"100%", maxHeight:"100%"}}>
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;