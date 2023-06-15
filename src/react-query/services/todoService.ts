import APIClient, { AxiosError } from "./apiClient";

export interface TodoI {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
export default new APIClient<TodoI>("/todos");

export { AxiosError };
