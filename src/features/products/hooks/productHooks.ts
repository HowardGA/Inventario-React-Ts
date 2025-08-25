import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, updateProduct, deleteProduct, createProduct } from "../services/productService";
import type { Item } from "../../../types/Products";

// Obtener todos los productos
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });
};

// Crear producto
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};

// Actualizar producto
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, item }: { id: number; item: Item }) => updateProduct(id, item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};

// Eliminar producto
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};
