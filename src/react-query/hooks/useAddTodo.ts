import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { TodoI, AxiosError } from "../services/todoService";

const useAddTodos = () => {
  // variables means : the input ( wsh dakhalna comme info w b3atna )
  const [oldTodos, setOldTodos] = useState<TodoI[]>([]);
  const queryClient = useQueryClient();
  return useMutation<TodoI, AxiosError, TodoI>({
    mutationFn: todoService.post,

    onMutate(sentTodo) {
      setOldTodos(queryClient.getQueryData<TodoI[]>(CACHE_KEY_TODOS) || []);
      queryClient.setQueryData<TodoI[]>(CACHE_KEY_TODOS, (oldTodos) => [
        sentTodo,
        ...(oldTodos || []),
      ]);
    },

    onSuccess(receivedTodo, sentTodo) {
      // [-] Invalidating the cache (wont work with jsonplaceholder) :
      // queryClient.invalidateQueries({
      //   queryKey: CACHE_KEY_TODOS,
      // });
      // [-] Updating the data of the cache :
      queryClient.setQueryData<TodoI[]>(CACHE_KEY_TODOS, (oldTodos) => {
        const tmp = oldTodos?.filter((el) => el.id !== sentTodo.id);
        return [receivedTodo, ...(tmp || [])];
      });
    },

    onError() {
      queryClient.setQueryData<TodoI[]>(CACHE_KEY_TODOS, oldTodos);
    },
  });
};

export default useAddTodos;
