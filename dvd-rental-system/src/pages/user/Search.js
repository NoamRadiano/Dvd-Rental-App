import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import MovieCart from '../../components/MovieCart';
import movieService from '../../services/movieService';
import Spinner from "../../components/Spinner";

const SearchPage = () => {
    const [movies, setMovies] = useState(null);
    const param = useParams();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        movieService.getAllMovies().then(response => {
            setIsLoading(false);
            if(response.data) {
                // filter by movie title
                let data = response.data.filter(movie => movie.title.toLowerCase().indexOf(param.name.toLowerCase()) >= 0);
                if(data.length)
                    setMovies(data);
            }

        }).catch(error => {
            console.error('Error fetching movies', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, []);
    if(isLoading)
        return <Spinner/>;
    return (

        <div className="user home">
            <h1>Hot Movies</h1>
            <div className="row">
                {movies ? movies.map((movie)=>
                    <div className="col-sm-3 m-3">
                        <MovieCart movie={movie}/>
                    </div>
                ): <h3>There is no movies like to "{param.name}"</h3>}
            </div>
        </div>
    );
};

export default SearchPage;