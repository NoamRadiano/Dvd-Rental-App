import React, {useEffect, useState} from 'react';
import MovieCart from '../../components/MovieCart';
import movieService from '../../services/movieService';
import Spinner from "../../components/Spinner";
import useGlobalState from "../../stores/useGlobalState";

const UserHomePage = () => {
    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {searchName} = useGlobalState();
    useEffect(() => {
        movieService.getAllMovies().then(response => {
            setIsLoading(false);
            if(searchName !== "")
                response.data = response.data?.filter(movie => movie.title.toLowerCase().indexOf(searchName.toLowerCase()) >= 0);
            if(response.data && response.data.length) {
                setMovies(response.data);
            }
            else{
                setMovies(null);
            }
        }).catch(error => {
            console.error('Error fetching movies', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, [searchName]);
    if(isLoading)
        return <Spinner/>;
    return (

        <div className="user home">
            <h1>All Movies</h1>
            <div className="row">
                {movies ? movies.map((movie)=>
                    <div className="col-sm-3 m-3">
                        <MovieCart movie={movie}/>
                    </div>
                )
                :
                    <h3>There is no existed movies.</h3>
                }
            </div>
        </div>
    );
};

export default UserHomePage;