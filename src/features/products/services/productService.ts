import apiClient from "../../../libs/apiClient";
import type { Item } from "../../../types/Products";
import type { ApiResponse } from "../../../types/api";

// Obtener todos los productos
export const getProducts = async (): Promise<ApiResponse<Item[]>> => { // Con promise indicamos que lo que nos retornara
  //la api es un respuesta de tipo ApiResponse y por su cuenta ApiResponse necesita el tipo que retornara que en este caso es
  // Item
  const response = await apiClient.get("/products");
  return response.data;
};

// Crear producto
export const createProduct = async (item: Item): Promise<ApiResponse<Item>> => {
  const response = await apiClient.post("/products", item);
  return response.data;
};

// Actualizar producto
export const updateProduct = async (id: number, item: Item): Promise<ApiResponse<Item>> => {
  const response = await apiClient.put(`/products/${id}`, item);
  return response.data;
};

// Eliminar producto
export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};