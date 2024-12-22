import React from 'react';
import Table from 'react-bootstrap/Table';
import RatingStars from './RatingStars';

const ReviewTable = (props = null) => {

    if(!props.reviews) return <div> There is no review.</div>;

   return (
        <>
            <Table stripped  hover size="lg">
                <thead>
                <tr>
                    <th width="270">User Name</th>
                    <th width="170">rate</th>
                    <th >review</th>
                </tr>
                </thead>
                <tbody>
                {props.reviews.map((review) =>
                <tr key={review.id}>
                    <td>{review.user.name}</td>
                    <td><RatingStars count = {review.rate}/></td>
                    <td>{review.text}</td>
                </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default ReviewTable