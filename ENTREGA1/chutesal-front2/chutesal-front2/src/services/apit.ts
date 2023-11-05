import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
    baseURL: url,
    timeout: 5 * 1000
})


export default apiInstance;