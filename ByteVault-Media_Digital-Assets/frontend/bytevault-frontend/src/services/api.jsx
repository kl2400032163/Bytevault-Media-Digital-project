import axios from "axios";

const api = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach JWT to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle authentication errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;