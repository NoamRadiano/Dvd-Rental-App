import axios from 'axios';

const API_URL = 'http://localhost:8090/api/users';
const  token =sessionStorage.getItem("token");
const config = {
    headers: { Authorization: `Bearer ${token}` }
}
const getUsers = () => {
    return axios.get(API_URL, config);
};



export default {
    getUsers
};