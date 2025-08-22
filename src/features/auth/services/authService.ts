import apiClient from "../../../libs/apiClient";
import type { Credentials } from "../types/authTypes";
import type { User } from "../../user/types/userTypes";
import type { ApiResponse } from "../../../types/api";

// Servicio para iniciar sesión.
// Aquí mandamos las credenciales al backend, y esperamos recibir un usuario y/o cookie token.
export const login = async (credentials: Credentials) => {
  const response = await apiClient.post<ApiResponse<User>>("/auth/login", credentials);
  return response.data;
};

// Servicio para registrar un usuario nuevo.
// El backend respondería con un usuario creado y un token para inicial sesion automaticamente.
export const register = async (user: User) => {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", user);
    return response.data;
};

// Servicio para tomar informacion del usuario con la cookie
export const me = async () => {
    const response = await apiClient.get<ApiResponse<User>>("/profile/me");
    return response.data;
};
