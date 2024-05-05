import axios from "axios"

const axiosAPI = axios.create({
    baseURL:'http://localhost:4000/'
})


// Configurar el interceptor
axiosAPI.interceptors.request.use((config) => {
    return config;
});

export {axiosAPI}