import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import MovieCart from '../../components/MovieCart';
import movieService from '../../services/movieService';
import Spinner from "../../components/Spinner";
import useGlobalState from "../../stores/useGlobalState";

const UserCategoryPage = () => {
    const [movies, setMovies] = useState(null);
    const category_name= useParams().name;
    const [isLoading, setIsLoading] = useState(true);
    const {searchName, categories} = useGlobalState();
    useEffect(() => {
        if (category_name) {
            movieService.getAllMovies().then(response => {
                setIsLoading(false);
                if(response.data && response.data.length) {

                    let temp = response.data?.filter(movie => movie.category.name === category_name);
                    if(searchName !== "")
                        temp = temp?.filter(movie => movie.title.toLowerCase().indexOf(searchName.toLowerCase()) >= 0)
                    if(temp.length){
                        setMovies(temp);
                    }
                    else{
                        setMovies(null);
                    }
                }
                else{
                    setMovies(null);
                }

            }).catch(error => {
                if(error.response.status && error.response.status === 403) window.location.assign("/login");
            });
        }
    }, [category_name, searchName]);
    if(isLoading)
        return <Spinner/>;
    return (
        <div className="user home">
            <h1>{category_name} Movies</h1>
            <div className="row">
                {
                    movies ? movies.map((movie)=>
                    <div key={movie.id} className="col-sm-3 m-3">
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

export default UserCategoryPage;