import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory } from "../services/categoryService";
import type { Category } from "../../../types/Products";

// Hook para obtener todas las categorías
export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });
};

// Hook para crear una categoría
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (category: Category) => createCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });
};