import axios from 'axios';

const API_URL = 'http://localhost:8090/api/reviews';
const  token =sessionStorage.getItem("token");
// axios.defaults.headers.common = {Authorization: `bearer ${token}`}
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const getAllReviews = () => {
    return axios.get(API_URL, config);
};

const getReview = (id) => {
    return axios.get(`${API_URL}/${id}`, config);
};

const addReview = (reviewData) => {
    return axios.post(API_URL, reviewData, config);

};



export default {
    getAllReviews,
    getReview,
    addReview
};
