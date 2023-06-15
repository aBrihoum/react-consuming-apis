import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export interface ParamsI {
  params: Object;
}

export default class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (params?: ParamsI) => {
    return axiosInstance
      .get<T[]>(this.endpoint, params)
      .then((res) => res.data);
  };

  post = (data: T) => {
    console.log(data);
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export { AxiosError };
