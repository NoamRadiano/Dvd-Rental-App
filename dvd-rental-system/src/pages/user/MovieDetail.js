import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../../components/MovieDetail';
import ModalReviewl from '../../components/ModalReviewl';
import movieService from "../../services/movieService";


const MovieDetailPage = () => {
    const id = useParams().id;
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        // get movie data
        movieService.getMovie(id).then(response => {
            setMovie(response.data);
        }).catch(error => {
            console.error('Error fetching movie details', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        })
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {/*// <!-- The Modal -->*/}
            <ModalReviewl id={id}/>
            <MovieDetail movie={movie} />
        </>
    );
};

export default MovieDetailPage;