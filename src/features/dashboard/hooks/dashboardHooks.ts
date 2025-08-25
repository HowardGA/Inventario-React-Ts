import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboardService";

// Hook para manejar el estado y caching de los datos del dashboard
export const useDashboard = () => {
    return useQuery({
        queryKey: ["dashboardData"],
        queryFn: getDashboardData
    });
};