import useGetTodos from "./hooks/useGetTodos";

export default function TodosList() {
  const { data: todos, error, isLoading } = useGetTodos();
  if (error) return <h1 className="red">Error -- {error.message}</h1>;
  if (isLoading) return <h1 className="green">Loading... </h1>;
  return (
    <>
      <ul>
        {todos?.map((el) => (
          <li key={el.id}>
            {" "}
            {el.id} - {el.title}
          </li>
        ))}
      </ul>
    </>
  );
}
