import React from 'react';


const RatingStars = (props=null) => {
    var elements=[];
    for(var i=0; i < 5;i++){
        if(i < props.count)
            elements.push(<span className="fa fa-star" style={{color:"orange"}}></span>);
        else
            elements.push(<span className="fa fa-star" style={{color:"darkgray"}}></span>);
    }
    return (
        <>
            {elements}
        </>
    );
};

export default RatingStars;