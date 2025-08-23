import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { login, register, me, logout } from "../services/authService";
import type { Credentials } from "../types/authTypes";
import type { User } from "../../user/types/userTypes";
import { useNavigate } from "react-router-dom";
// Hook para manejar el login
export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        // Llamamos al servicio login con las credenciales del usuario
        mutationFn: (credentials: Credentials) => login(credentials),
        onSuccess: (data) => {
            // Invalida datos del usuario logueado para refrescar cualquier query dependiente
            queryClient.invalidateQueries({ queryKey: ['authMe'] });

            // Redirige al dashboard después del login exitoso
            navigate('/dashboard');
            console.log("Login successful!", data);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
};

// Hook para manejar el registro
export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        // Llamamos al servicio register con los datos del nuevo usuario
        mutationFn: (user: User) => register(user),
        onSuccess: (data) => {
            // Redirige al home (en este ejemplo) tras registro exitoso
            navigate('/');
            console.log("Registration successful!", data);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        },
    });
};

export const useAuthMe = () => {
    return useQuery({
        queryKey: ["authMe"],
        queryFn: me,
        retry: false, // si falla, no reintenta automáticamente
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // Invalidamos la query de "authMe", de este modo no quedara ningun dato sobre el usuario dentro del cache
            queryClient.invalidateQueries({ queryKey: ["authMe"] });

            // Regresamos al login
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });
};
