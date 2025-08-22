import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // API pública de prueba. En un proyecto real
    //  se debería cambiar a la URL de la API de verdad
    headers: {
        "Content-Type": "application/json", // Utilizamos JSON como formato de intercambio
    },
});

// Ejemplo de interceptor se se desea agreggar autenticación o manipular las solicitudes antes de enviarlas
apiClient.interceptors.response.use(
    (response) => response,// Aquí se puede manipular la respuesta antes de que llegue al componente
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;
