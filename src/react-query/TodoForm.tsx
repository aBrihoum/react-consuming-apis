import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { TodoI } from "./hooks/useGetTodos";
import axios, { AxiosError } from "axios";

interface AddTodoContextI {
  previousTodos: TodoI[];
}

export default function TodoForm() {
  // variables means : the input ( wsh dakhalna comme info w b3atna )
  const queryClient = useQueryClient();
  const {
    mutate: addTodo,
    error,
    isLoading,
  } = useMutation<TodoI, AxiosError, TodoI, AddTodoContextI>({
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
      // - Invalidating the cache (wont work with jsonplaceholder) :
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });
      // - Updating the data of the cache :
      queryClient.setQueryData<TodoI[]>(["todos"], (oldTodos) => {
        const tmp = oldTodos?.filter((el) => el.id !== sentTodo.id);
        return [receivedTodo, ...(tmp || [])];
      });
    },

    onError(error, sentTodo, context) {
      queryClient.setQueryData<TodoI[]>(["todos"], context?.previousTodos);
    },
  });
  const input = useRef<HTMLInputElement>(null);
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (input.current && input.current.value)
      addTodo({
        title: input.current.value,
        completed: false,
        id: 0,
        userId: 1,
      });
  };
  return (
    <>
      {error && (
        <div>
          <h1 className="red">ERROR - {error?.message}</h1>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="margin">
          <label htmlFor="name">Name : </label>
          <input ref={input} type="text" id="name" />
        </div>
        <div className="margin">
          <button disabled={isLoading} type="submit">
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
