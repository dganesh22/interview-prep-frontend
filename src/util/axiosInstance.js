import axios from 'axios'
import { BASE_URL } from "./apiPath.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

// request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("accessToken");
        if(accessToken !== null && accessToken !== undefined) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        // handle common errors globally
        if(err.response.status === 401) {
            // redirect to login page
            window.location.href = "/";
        } else if (err.response.status === 500) {
            console.error("server error please try again later");
        }else if (err.code === "ECONNABORTED") {
            console.error("request timed out " + err.message)
        }
        return Promise.reject(err);
    }
);

export  default  axiosInstance;