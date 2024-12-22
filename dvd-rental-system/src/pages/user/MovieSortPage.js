import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import MovieCart from '../../components/MovieCart';
import movieService from '../../services/movieService';
import Spinner from "../../components/Spinner";
import useGlobalState from "../../stores/useGlobalState";

const UserMovieSortPage = () => {
    const [movies, setMovies] = useState(null);
    const sort_key= useParams().key;
    const [isLoading, setIsLoading] = useState(true);
    const {searchName} = useGlobalState();

    useEffect(() => {
        movieService.getAllMovies().then(response => {
            setIsLoading(false);
            if(response.data && response.data.length > 0) {
                if (sort_key === "rated") {
                    response.data.sort((b, a) => {
                        return a.rating - b.rating
                    });
                }
                else if (sort_key === "new_released") {
                    response.data.sort((b, a) => {
                        if (a.releaseDate < b.releaseDate) {
                            return -1;
                        }
                        if (a.releaseDate > b.releaseDate) {
                            return 1;
                        }
                        return 0;
                    });
                } else if (sort_key === "recommended") {
                    response.data = response.data.filter(movie => movie.recommend);
                }
                if(response.data.length > 0){
                    if(searchName !== "")
                        response.data = response.data.filter(movie => movie.title.toLowerCase().indexOf(searchName.toLowerCase()) >= 0)
                }
                if(response.data.length > 0)
                    setMovies(response.data);
                else
                    setMovies(null);
            }
        }).catch(error => {
            console.error('Error fetching movies', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, [sort_key, searchName]);

    const getSortName = (key) =>{
        let title = `${key}`;
        return title.replace('_', ' ');
    }
    if(isLoading)
        return <Spinner/>;
    return (

        <div className="user sort">
            <h1>{getSortName(sort_key)} Movies</h1>
            <div className="row">
                {movies ? movies.map((movie)=>
                    <div key={movie.id} className="col-sm-3 m-3">
                        <MovieCart movie={movie}/>
                    </div>
                )
                    :
                    <h3>There is no existed movies.</h3>}
            </div>
        </div>
    );
};

export default UserMovieSortPage;