import React, {useEffect, useState} from 'react';
import AdminEditableMovieTable from "../../components/AdminEditableMovieTable";
import movieService from "../../services/movieService";

const EditMovies = () => {
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        movieService.getAllMovies().then(response => {
            setMovies(response.data);
        }).catch(error => {
            console.error('Error fetching users', error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, []);
    return (
        <div className="admin edit-movies">
            <h1>Edit Movies <i className="fa fa-pencil"></i></h1>
            <AdminEditableMovieTable movies={movies}/>
        </div>
    );
};

export default EditMovies;
