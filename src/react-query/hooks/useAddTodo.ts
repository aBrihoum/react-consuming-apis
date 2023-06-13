import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TodoI } from "./useGetTodos";
import { useState } from "react";

const useAddTodos = () => {
  // variables means : the input ( wsh dakhalna comme info w b3atna )
  const [oldTodos, setOldTodos] = useState<TodoI[]>([]);
  const queryClient = useQueryClient();
  return useMutation<TodoI, AxiosError, TodoI>({
    mutationFn: (todo: TodoI) =>
      axios
        .post<TodoI>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onMutate(sentTodo) {
      setOldTodos(queryClient.getQueryData<TodoI[]>(["todos"]) || []);
      queryClient.setQueryData<TodoI[]>(["todos"], (oldTodos) => [
        sentTodo,
        ...(oldTodos || []),
      ]);
    },

    onSuccess(receivedTodo, sentTodo) {
      // [-] Invalidating the cache (wont work with jsonplaceholder) :
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });
      // [-] Updating the data of the cache :
      queryClient.setQueryData<TodoI[]>(["todos"], (oldTodos) => {
        const tmp = oldTodos?.filter((el) => el.id !== sentTodo.id);
        return [receivedTodo, ...(tmp || [])];
      });
    },

    onError() {
      queryClient.setQueryData<TodoI[]>(["todos"], oldTodos);
    },
  });
};

export default useAddTodos;
