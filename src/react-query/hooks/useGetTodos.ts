import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient, { AxiosError, ParamsI } from "../services/apiClient";
export interface TodoI {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
const apiClient = new APIClient<TodoI>("/todos");
const useGetTodos = () => {
  return useQuery<TodoI[], AxiosError>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: () => apiClient.getAll(),
    refetchOnWindowFocus: false,
  });
};

export default useGetTodos;
