import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://expresscritic.onrender.com',
    // baseURL: 'http://localhost:5000/',
    withCredentials: true,
});

export default axiosInstance;
