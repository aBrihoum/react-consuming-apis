import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { TodoI, AxiosError } from "../services/todoService";

const useGetTodos = () => {
  return useQuery<TodoI[], AxiosError>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: () => todoService.getAll(),
    refetchOnWindowFocus: false,
  });
};

export default useGetTodos;
