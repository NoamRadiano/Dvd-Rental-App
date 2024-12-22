import React, {useEffect, useState} from 'react';
import ReviewTable from "./TableUsersReviews";
import reviewService from "../services/reviewService";

const ModalReviewl = (props=null) => {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
            // get review data
            reviewService.getReview(props.id).then(response => {
                setReviews(response.data);
            }).catch(error => {
                console.error('Error fetching review details', error);
                if(error.response.status && error.response.status === 403) window.location.assign("/login");
            });

    }, [props.id]);
    if(!props){
        return <div> movie id is not pass.</div>
    }
    return (
        <div className="modal modal-lg" id="reviewModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Reviews</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <ReviewTable reviews={reviews}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalReviewl;