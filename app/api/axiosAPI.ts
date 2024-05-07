import axios from "axios"

const axiosAPI = axios.create({
    baseURL:process.env.NEXT_PRIVATE_API_BASE_URL
})


// Configurar el interceptor
axiosAPI.interceptors.request.use((config) => {
    return config;
});

export {axiosAPI}