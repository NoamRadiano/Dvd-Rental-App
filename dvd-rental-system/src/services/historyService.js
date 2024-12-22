import axios from 'axios';

const API_URL = 'http://localhost:8090/api/histories';
const  token =sessionStorage.getItem("token");
// axios.defaults.headers.common = {Authorization: `bearer ${token}`}
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const getAllHistories = () => {
    return axios.get(API_URL, config);
};

const getHistory = (id) => {
    return axios.get(`${API_URL}/${id}`, config);
};

const addHistory = (historyData) => {
    return axios.post(API_URL, historyData, config);

};
const updateHistory = (id, historyData) => {
    return axios.put(`${API_URL}/${id}`, historyData, config);
};


export default {
    getAllHistories,
    getHistory,
    addHistory,
    updateHistory
};
