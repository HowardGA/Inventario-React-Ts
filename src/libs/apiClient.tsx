import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://simple-inventory-mh1q.onrender.com/api",// URL del backend
    headers: {
        "Content-Type": "application/json", 

    },
    withCredentials: true, // Parametro necesario para poder aceptar las cookies y guardarlas
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;
