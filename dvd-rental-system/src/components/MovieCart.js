import React from 'react';
import StnImg from "../pages/admin/img/snt.png";


const MovieCart = (props=null) => {
    // Hex to Base64
    const hexToBase64 = (hexstring) => {
        return btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    }
    return (
        <div>
            <div className="card p-2 movieCart" >
                <img src={`data:image/jpeg;base64,${props.movie.imgData}`} className="rounded card-img-top w-100" alt={props.movie.title} style={{height:"200px"}}/>
                    <div className="card-body">
                        <h4 className="card-title">{props.movie.title}</h4>
                        {props.movie.quantity ?
                            <a href={`/user/movies/${props.movie.id}`}
                               className="btn btn-primary btn-custom w-100 rounded-5">Rent</a>
                            :
                            <button className="btn btn-custom btn-custom w-100 rounded-5">Out of Stock</button>
                        }
                    </div>
            </div>
        </div>
    );
};

export default MovieCart;