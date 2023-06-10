import apiClient from "./api-client";

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllEntities<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, abort: () => controller.abort() };
  }

  deleteEntity(id: number) {
    return apiClient.delete(this.endpoint + id);
  }

  addEntity<T>(entityData: T) {
    return apiClient.post(this.endpoint, entityData);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
