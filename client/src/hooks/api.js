import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_SURL,
    withCredentials: true,
})

export const googleAuth = ( code ) => api.get(`/auth/google?code=${code}`);