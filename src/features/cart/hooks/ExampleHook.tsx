import { useQuery } from "@tanstack/react-query";// useQuery para manejar el estado de datos asincronos, 
// se usa para obtener datos de una API
import { getPosts } from "../services/ExampleService";

// Hook personalizado para obtener posts, recordamos que todos los hooks deben empezar con "use"
export const useGetPost = () => {
  return useQuery({
    queryKey: ["posts"], // Clave unica para identificar esta consulta
    queryFn: getPosts,// Funcion que obtiene los datos
    staleTime: 5 * 60 * 1000, // Tiempo en ms que los datos se consideran frescos (5 minutos)
  });
};
