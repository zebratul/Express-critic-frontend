import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://expresscritic.onrender.com',
    withCredentials: true,
});

export default axiosInstance;
