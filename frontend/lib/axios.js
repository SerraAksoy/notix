import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true, // opsiyonel, cookie ile auth varsa
});

instance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;