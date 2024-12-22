import React, { useEffect, useState } from 'react';


const GetRatingStars = (props=null) => {GetRatingStars.js
    const [count, setCount] = useState(0);
    const handleRating = (count) =>{
        setCount(count);
        props.rate = count;
    }
    var elements=[];
    for(var i=1; i <= 5;i++){
        elements.push(<span className="fa fa-star rating-star-input-able" ></span>);
    }

    return (
        <>
        {elements}
        </>
    );
};

export default GetRatingStars;