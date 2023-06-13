import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CACHE_KEY_TODOS } from "../constants";

export interface TodoI {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
const useGetTodos = () => {
  return useQuery<TodoI[], AxiosError>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export default useGetTodos;
