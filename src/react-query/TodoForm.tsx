import { useRef } from "react";
import useAddTodos from "./hooks/useAddTodo";

export default function TodoForm() {
  const input = useRef<HTMLInputElement>(null);

  const { mutate: addTodo, error, isLoading } = useAddTodos();

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
