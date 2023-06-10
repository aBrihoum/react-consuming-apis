import create from "./http-service";

export type UserT = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
};

export default create("/users/");
