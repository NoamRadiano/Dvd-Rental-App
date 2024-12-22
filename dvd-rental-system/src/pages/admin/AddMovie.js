import React, {useEffect, useState} from 'react';
import MovieComponent from '../../components/AddMovie';
import categorService from "../../services/categoryService";
import movieService from "../../services/movieService";

const AddMoviePage = () => {
    const [categories, setCategories] = useState(null);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        movieService.getAllMovies().then(response => {
            setMovies(response.data);
        }).catch(error => {
            console.error('Error fetching movie details', error);
        });
        // get categories
        categorService().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error('Error fetching categories', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, []);
    if(!categories) return <div>loading...</div>;
    return (
        <div className="admin add-movie">
            <h1>Add Movie</h1>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <MovieComponent categories={categories} movies={movies}/>
                </div>
            </div>
        </div>
    );
};

export default AddMoviePage;