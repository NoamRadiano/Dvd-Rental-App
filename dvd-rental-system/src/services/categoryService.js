import axios from 'axios';

const API_URL = 'http://localhost:8090/api/categories';

const getAllCategories = () => {
    return axios.get(API_URL);
};


export default  getAllCategories;
