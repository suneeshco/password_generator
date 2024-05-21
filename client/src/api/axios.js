import axios from 'axios';
import { config } from '../config';


const api = axios.create({
    baseURL: config.authBaseURL,
    withCredentials: true
});

const userApi = axios.create({
    baseURL: config.userBaseURL,
    withCredentials: true
});



userApi.interceptors.request.use((config) => {
    const Token = localStorage.getItem('Token');
    if (Token !== null) {
        config.headers.authorization = `Bearer ${Token}`;
    }
    return config;
})



export const userApiRequest = async (config) => {
    try {
        const response = await userApi(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const apiRequest = async (config) => {
    try {
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};