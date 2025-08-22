import apiClient from "../../../libs/apiClient"; // Importamos el cliente de API configurado

// Funcion para obtener "posts" de jsonplaceholder
export const getPosts = async () => {
  const response = await apiClient.get("/posts"); // Usamos posts como ejemplo
  return response.data;
};
