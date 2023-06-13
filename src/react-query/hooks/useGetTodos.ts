import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export interface TodoI {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
const useGetTodos = () => {
  return useQuery<TodoI[], AxiosError>({
    queryKey: ["todos"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export default useGetTodos;
