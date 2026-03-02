import { API_BASE_URL } from "../utilities/config.util";
import { apiClient } from "../lib/api.client";

export const getProducts = async () => {
  return await apiClient(`${API_BASE_URL}/api/product/stock`);
};
