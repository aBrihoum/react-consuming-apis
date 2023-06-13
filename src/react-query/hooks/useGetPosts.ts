import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsQuery {
  page: number;
  pageSize: number;
  userId?: number;
}

const useGetPosts = ({ page, pageSize, userId }: PostsQuery) => {
  return useQuery<Post[], AxiosError>({
    queryKey: ["posts", userId, page, pageSize],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (page - 1) * pageSize,
            _limit: pageSize,
            userId,
          },
        })
        .then((res) => res.data),
    keepPreviousData: true,
  });
};

export default useGetPosts;