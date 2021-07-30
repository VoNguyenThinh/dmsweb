
import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_TEST,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `${token}`
    }
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.đata) {
        return response
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;