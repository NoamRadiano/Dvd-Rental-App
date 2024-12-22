import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import EditMovie from '../../components/AdminEditMovie';
import categorService from "../../services/categoryService";
import movieService from "../../services/movieService";


const EditMoviePage = () => {
    const [categories, setCategories] = useState(null);
    const [movie, setMovie] = useState(null);
    const id = useParams().id;
    useEffect(() => {
        //get movies
        movieService.getMovie(id).then(response => {
            setMovie(response.data);
        }).catch(error => {
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
        // get categories
        categorService().then(response => {
            setCategories(response.data);
        }).catch(error => {
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        });
    }, []);
    if(!categories) return <div>loading...</div>;
    if(!movie) return <div>loading movie...</div>;
    return (
        <div className="admin add-movie">
            <h1>Edit Movie</h1>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <EditMovie movie={movie} categories={categories}/>
                </div>
            </div>
        </div>
    );
};

export default EditMoviePage;