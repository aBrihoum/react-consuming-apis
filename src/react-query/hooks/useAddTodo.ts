import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TodoI } from "./useGetTodos";

interface AddTodoContextI {
  previousTodos: TodoI[];
}

const useAddTodos = () => {
  // variables means : the input ( wsh dakhalna comme info w b3atna )
  const queryClient = useQueryClient();
  return useMutation<TodoI, AxiosError, TodoI, AddTodoContextI>({
    mutationFn: (todo: TodoI) =>
      axios
        .post<TodoI>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onMutate(sentTodo) {
      const previousTodos = queryClient.getQueryData<TodoI[]>(["todos"]) || [];
      queryClient.setQueryData<TodoI[]>(["todos"], (oldTodos) => [
        sentTodo,
        ...(oldTodos || []),
      ]);
      return { previousTodos };
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

    onError(error, sentTodo, context) {
      queryClient.setQueryData<TodoI[]>(["todos"], context?.previousTodos);
    },
  });
};

export default useAddTodos;
