import apiClient from "./api-client";

export type UserT = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
};

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<UserT[]>("/users", {
      signal: controller.signal,
    });
    return { request, abort: () => controller.abort() };
  }

  deleteUser(id: number) {
    return apiClient.delete("/users/" + id);
  }
  addUser(userData: UserT) {
    return apiClient.post("/users", userData);
  }
}

export default new UserService();
