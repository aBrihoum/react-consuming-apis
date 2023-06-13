import { useState } from "react";
import useGetPosts from "./hooks/useGetPosts";

export default function PostsPagination() {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number>();
  const pageSize = 5;
  const {
    data: posts,
    error,
    isLoading,
    isFetching,
  } = useGetPosts({ page, pageSize, userId });
  if (error) return <h1 className="red">Error -- {error.message}</h1>;
  return (
    <>
      {isLoading && <h1 className="green">Loading... </h1>}
      <select
        title="select user"
        value={userId}
        onChange={(ev) => setUserId(Number(ev.target.value))}
      >
        <option selected disabled>
          select an user
        </option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul style={isFetching ? { backgroundColor: "#8080805c" } : {}}>
        {posts?.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
      <hr />
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
}
