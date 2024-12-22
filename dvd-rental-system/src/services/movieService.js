import axios from 'axios';

const API_URL = 'http://localhost:8090/api/movies';
const  token =sessionStorage.getItem("token");
// axios.defaults.headers.common = {Authorization: `bearer ${token}`}
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const getAllMovies = () => {
    return axios.get(API_URL, config);
};

const getMovie = (id) => {
    return axios.get(`${API_URL}/${id}`, config);
};

const addMovie = (movie) => {
    return axios.post(API_URL, movie, config);

};
const uploadImg = (formData) => {

    return axios.post(API_URL+"/upload", formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }});

};

const updateMovie = (id, movie) => {
    return axios.put(`${API_URL}/${id}`, movie, config);
};

const deleteMovie = (id) => {
    return axios.delete(`${API_URL}/${id}`, config);
};

export default {
    getAllMovies,
    getMovie,
    addMovie,
    uploadImg,
    updateMovie,
    deleteMovie
};
