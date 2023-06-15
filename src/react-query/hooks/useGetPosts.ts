import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CACHE_KEY_POSTS } from "../constants";
import APIClient from "../services/apiClient";

interface PostI {
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

const apiClient = new APIClient<PostI>("/posts");

const useGetPosts = ({ page, pageSize, userId }: PostsQuery) => {
  const P = {
    params: { _start: (page - 1) * pageSize, _limit: pageSize, userId },
  };
  return useQuery<PostI[], AxiosError>({
    queryKey: [CACHE_KEY_POSTS, userId, page, pageSize],
    queryFn: () => apiClient.getAll(P),
    keepPreviousData: true,
  });
};

export default useGetPosts;
