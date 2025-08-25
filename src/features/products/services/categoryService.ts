import type { ApiResponse } from "../../../types/api";
import apiClient from "../../../libs/apiClient";
import type { Category } from "../../../types/Products";

// Son funciones que retornan algo, ya que utilizamos TS podemos especificar que es lo que retornaran, en este caso 
// retornaran una promesa la cual contiene un formato que ya especificamos en ApiResponse que este a su vez contendra como
//data a Category y category[]
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
    const response = await apiClient.get('/categories/');
    return response?.data;
};

export const createCategory = async (category: Category): Promise<ApiResponse<Category>> => {
    const response = await apiClient.post('/categories/', category);
    return response?.data;
}