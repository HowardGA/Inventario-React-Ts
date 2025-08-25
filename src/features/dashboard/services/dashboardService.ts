import type { Dashboard } from "../../../types/Dashboard";
import type { ApiResponse } from "../../../types/api";
import apiClient from "../../../libs/apiClient";

export const getDashboardData = async (): Promise<ApiResponse<Dashboard>> => {
    const response = await apiClient.get('/dashboard/');
    return response.data;
}