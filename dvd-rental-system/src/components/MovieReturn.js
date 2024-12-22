import React, { useState } from 'react';
import RatingStars from "../components/RatingStars";
import historyService from '../services/historyService';
import reviewService from '../services/reviewService';

const MovieReturn = (props=null) => {
    const [rate, setRate] = useState(0);
    const [recommend, setRecommend] = useState(false);
    const [text, setText] = useState('');
    if(!props){
        return <div> movie data is not pass.</div>
    }

    const date = new Date();
    // Hex to Base64
    const hexToBase64 = (hexstring) => {
        return btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    }

    const handleReturn = () => {
        props.history.dateReturned = date.getFullYear() +"-"+ (date.getMonth() + 1) + "-"+ date.getDate();
        historyService.updateHistory(props.history.id, props.history).then(response => {
            alert('Returned, Please write review.');

        }).catch(error => {
            console.error('Error fetching movie details', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }
    const handleReview = () => {

        var reviewData = {
            rate: rate,
            text: text,
            user: props.history.user,
            movie: props.history.movie
        }
        if(recommend)
            reviewData.movie.recommend += 1;
        reviewService.addReview(reviewData).then(response => {
            window.location.assign('/user/history');
        }).catch(error => {
            console.error('Error fetching movie details', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    };
    const onChangeRate = (e) => {
        setRate(e.target.value);
    };
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    const onChangeRecommend = (e) => {
        setRecommend(e.target.value);
    };
    return (
        <div className='user movie-return'>
            {/*// <!-- The Modal -->*/}
            <div class="modal" id="reviewModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Please Write a review</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <h5 className="mb-5"> Rate : <input type="number" value={rate} min={0} max={5}  onChange={onChangeRate}/> <RatingStars count={rate}/></h5>
                            <h5 className="mb-5"> Recommend :  <input className="form-check-input" type="checkbox" name="recommend"
                                                                      value={recommend}
                                                                      onChange={onChangeRecommend}
                            /></h5>
                            <h5> Review : </h5>
                            <textarea className="form-control" rows="5" id="comment" name="text" onChange={onChangeText} value={text}></textarea>

                        </div>

                        <div class="modal-footer">
                            <button type="button" className="btn btn-custom w-100 btn-lg"
                                    onClick={handleReview}>Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row">
                <h1>{props.history.movie.title}</h1>
                <div className="col-sm-6">
                    <img src={`data:image/jpeg;base64,${props.history.movie.imgData}`} className="rounded card-img-top w-100 h-100" alt={props.history.movie.title} style={{height:"200px"}}/>
                </div>
                <div className="col-sm-6">
                    <h2><b>Information</b></h2>
                    <h3 className="p-3">{props.history.movie.information}</h3>
                    <h3><b>Director</b> - {props.history.movie.director}</h3>
                    <h3><b>Release Date</b> - {props.history.movie.releaseDate}</h3>
                    <h3><b>Duration</b> - {props.history.movie.duration} min</h3>
                    <h3><b>Age</b> - {props.history.movie.age? "18+": "Under 18"} </h3>
                    <h3><b>Rate</b> - <RatingStars count={props.history.movie.rating}/> </h3>
                    <h3><b>Price</b> - {props.history.movie.price}$ </h3>
                    <div className="d-flex justify-content-center mt-5">
                        <button className="btn btn-custom w-75 btn-lg rounded-4" data-bs-toggle="modal" data-bs-target="#reviewModal" onClick={handleReturn}> Return</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default MovieReturn;