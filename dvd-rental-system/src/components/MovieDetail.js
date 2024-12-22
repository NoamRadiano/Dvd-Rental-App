import React  from 'react';
import RatingStars from "../components/RatingStars";
import historyService from '../services/historyService';

const MovieDetail = (props=null) => {
    if(!props){
        return <div> movie data is not pass.</div>
    }
    const date = new Date();
    const handleRent = () => {
        historyService.addHistory(
            {
                dateStarted: date.getFullYear() +"-"+ (date.getMonth() + 1) + "-"+ date.getDate(),
                dateReturned: null,
                movie : props.movie,
                user: null
            }
            ).then(response => {
                 alert("Successfully rented!");
                 window.location.assign('/user/history');
                }).catch(error => {
            console.error('Error fetching movie details', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        })
    };
    // Hex to Base64
    const hexToBase64 = (hexstring) => {
        return btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    };
    return (
        <div className='user movie-detail'>

            <div className="row">
                <h1>{props.movie.title}</h1>
                <div className="col-sm-6">
                    <img src={`data:image/jpeg;base64,${props.movie.imgData}`} className="rounded card-img-top w-100 h-100" alt={props.movie.title} style={{height:"200px"}}/>
                </div>
                <div className="col-sm-6">
                    <h2><b>Information</b></h2>
                    <h3 className="p-3">{props.movie.information}</h3>
                    <h3><b>Director</b> - {props.movie.director}</h3>
                    <h3><b>Release Date</b> - {props.movie.releaseDate}</h3>
                    <h3><b>Duration</b> - {props.movie.duration} min</h3>
                    <h3><b>Age</b> - {props.movie.age? "18+": "Under 18"} </h3>
                    <h3><b>Rate</b> - <RatingStars count={props.movie.rating}/> </h3>
                    <h3><b>Price</b> - {props.movie.price}$ </h3>
                    <div className="d-flex justify-content-end me-5">
                        <button className="btn btn-outline-primary btn-sm rounded-4" data-bs-toggle="modal" data-bs-target="#reviewModal"> view Review</button>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        {(props.movie.quantity >  0)? <button className="btn btn-dark w-75 btn-lg rounded-4" onClick={handleRent}> Rent </button> :
                            <button className="btn btn-custom w-75 btn-lg rounded-4 disabled"> Out of Stock </button>}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default MovieDetail;